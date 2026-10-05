import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import { createServer } from "node:net";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const probe = createServer();
await new Promise((resolve) => probe.listen(0, "127.0.0.1", resolve));
const port = probe.address().port;
await new Promise((resolve) => probe.close(resolve));
const origin = `http://localhost:${port}`;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--port", String(port)],
  {
    stdio: ["ignore", "pipe", "pipe"],
    detached: process.platform !== "win32",
  },
);
server.stdout.on("data", (chunk) => process.stdout.write(chunk));
server.stderr.on("data", (chunk) => process.stderr.write(chunk));
const reports = ".lighthouseci/reports";
await mkdir(reports, { recursive: true });
let browser;
let failed = false;
try {
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    try {
      const response = await fetch(origin);
      ready = response.ok;
    } catch {
      /* Server is starting. */
    }
    if (ready) break;
    if (server.exitCode !== null)
      throw new Error("Production server exited before becoming ready.");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!ready) throw new Error("Production server did not become ready.");
  browser = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
  });
  const summaries = [];
  for (const path of ["/", "/projects", "/careers"]) {
    const runs = [];
    for (let run = 0; run < 3; run++) {
      const result = await lighthouse(origin + path, {
        port: browser.port,
        output: ["html", "json"],
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      });
      if (!result) throw new Error("Lighthouse returned no report.");
      const { lhr, report } = result;
      if (lhr.runtimeError) throw new Error(lhr.runtimeError.message);
      const scores = Object.fromEntries(
        Object.entries(lhr.categories).map(([key, category]) => [
          key,
          category.score,
        ]),
      );
      const cls = lhr.audits["cumulative-layout-shift"].numericValue;
      runs.push({ ...scores, cls });
      const name = `${path === "/" ? "home" : path.slice(1)}-${run + 1}`;
      await writeFile(`${reports}/${name}.html`, report[0]);
      await writeFile(`${reports}/${name}.json`, report[1]);
      console.log(`${path} run ${run + 1}:`, scores, `CLS ${cls}`);
    }
    const median = (key) =>
      runs.map((run) => run[key]).sort((a, b) => a - b)[1];
    const summary = {
      path,
      ...Object.fromEntries(
        ["performance", "accessibility", "best-practices", "seo", "cls"].map(
          (key) => [key, median(key)],
        ),
      ),
    };
    summaries.push(summary);
    for (const key of ["accessibility", "best-practices", "seo"]) {
      if (summary[key] < 0.95) {
        console.error(`${path}: ${key} below 95.`);
        failed = true;
      }
    }
    if (summary.cls > 0.1) {
      console.error(`${path}: CLS above 0.1.`);
      failed = true;
    }
    if (summary.performance < 0.9)
      console.warn(
        `${path}: performance below the 90 target; review the report.`,
      );
  }
  await writeFile(
    `${reports}/summary.json`,
    JSON.stringify(summaries, null, 2),
  );
} finally {
  await browser?.kill();
  if (server.pid) {
    try {
      if (process.platform === "win32")
        await promisify(execFile)("taskkill.exe", [
          "/PID",
          String(server.pid),
          "/T",
          "/F",
        ]);
      else process.kill(-server.pid, "SIGTERM");
    } catch {
      /* The owned server may already have exited. */
    }
  }
}
if (failed) process.exitCode = 1;
