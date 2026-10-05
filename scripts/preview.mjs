import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir(".local-preview", { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
  }
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  await page.locator(".study canvas").waitFor();
  await page
    .locator(".study")
    .screenshot({ path: ".local-preview/structural-study.png" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: ".local-preview/desktop.png",
    fullPage: true,
  });
  await page.screenshot({ path: ".local-preview/desktop-hero.png" });
  await page.locator("#projects").screenshot({
    path: ".local-preview/project-gallery.png",
    style: ".site-header, .whatsapp-float { visibility: hidden; }",
  });
  await page.locator(".trusted-section").screenshot({
    path: ".local-preview/colour-logos.png",
    style: ".site-header, .whatsapp-float { visibility: hidden; }",
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: ".local-preview/mobile.png",
    fullPage: true,
  });
  await page.screenshot({ path: ".local-preview/mobile-hero.png" });
} finally {
  await browser.close();
}
