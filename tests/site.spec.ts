import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage, project portfolio, and careers are navigable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Built with purpose." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore our work" }).click();
  await expect(
    page.getByRole("heading", { name: "Projects, in detail." }),
  ).toBeInViewport();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Our work, in focus." }),
  ).toBeVisible();
  await expect(
    page.getByText("DKS BUILDERS / COMING SOON", { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to home" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Careers" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Build your next chapter." }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`content fits the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Built with purpose." }),
    ).toBeVisible();
    await page
      .getByRole("heading", {
        name: "Your vision. Our next conversation.",
        exact: true,
      })
      .scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("link", { name: "dksbuilders@gmail.com", exact: true }),
    ).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);
  });
}

test("mobile menu supports navigation and Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Expertise, across every discipline." }),
  ).toBeInViewport();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("service accordion exposes useful content", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Bridge construction", { exact: true }).click();
  await expect(
    page.getByText(
      "Civil engineering and construction for bridge infrastructure.",
    ),
  ).toBeVisible();
  await expect(
    page.getByAltText("Illustrative bridge construction in Sri Lanka"),
  ).toBeVisible();
});

test("primary contact links use the preserved contact details", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "+94 91 22 90 737" }),
  ).toHaveAttribute("href", "tel:+94912290737");
  await expect(
    page.getByRole("link", { name: "dksbuilders@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:dksbuilders@gmail.com");
  await expect(
    page.locator("#contact").getByRole("link", { name: "Discuss a project" }),
  ).toHaveAttribute("href", /mailto:dksbuilders@gmail.com/);
});

test("film is optional and handles unavailable media", async ({ page }) => {
  await page.route("**/*.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(
    page.getByAltText("Illustrative contemporary tropical house among palms"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Play hero film" }).click();
  await expect(page.getByRole("status")).toContainText("film is unavailable");
  await expect(
    page.getByRole("heading", { name: "Built with purpose." }),
  ).toBeVisible();
});

test("reduced motion does not download film or automatically load WebGL", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const heavy: string[] = [];
  page.on("request", (request) => {
    if (/\.mp4|structural-scene/.test(request.url())) heavy.push(request.url());
  });
  await page.goto("/");
  await page.locator(".study").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Explore in 3D" }),
  ).toBeVisible();
  expect(await page.locator(".study canvas").count()).toBe(0);
  expect(heavy).toEqual([]);
});

test("3D sequence controls and pause function work", async ({ page }) => {
  await page.goto("/");
  await page.locator(".study").scrollIntoViewIfNeeded();
  await expect(page.locator(".study canvas")).toBeVisible({ timeout: 20000 });
  const enclosure = page.getByRole("button", {
    name: "Enclosure",
    exact: true,
  });
  await enclosure.click();
  await expect(enclosure).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Pause rotation" }).click();
  await expect(
    page.getByRole("button", { name: "Resume rotation" }),
  ).toBeVisible();
});

test("keyboard users can skip navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("critical pages meet automated WCAG AA checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/projects", "/careers"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});

test("local images load without broken assets", async ({ page }) => {
  await page.goto("/");
  const images = page.locator("img");
  for (let i = 0; i < (await images.count()); i++) {
    const image = images.nth(i);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});
test("hero film plays on request and pauses out of view", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Play hero film" }).click();
  await expect(page.getByRole("button", { name: "Pause film" })).toBeVisible({
    timeout: 15000,
  });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Play hero film" }),
  ).toBeAttached();
});
