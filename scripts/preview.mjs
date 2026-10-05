import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("test-results/previews", { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.screenshot({
    path: "test-results/previews/desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({
    path: "test-results/previews/mobile.png",
    fullPage: true,
  });
} finally {
  await browser.close();
}
