import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("projects combine search and filters, sort and recover from empty results", async ({
  page,
}) => {
  await page.goto("/projects");
  const cards = page.locator(".listing-card");
  await expect(cards).toHaveCount(3);
  await page.getByLabel("Sector", { exact: true }).selectOption("Commercial");
  await page.getByLabel("Location", { exact: true }).selectOption("Wariyapola");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText("Bank of Ceylon");
  await page.getByRole("searchbox").fill("unmatched");
  await expect(cards).toHaveCount(0);
  await page.getByRole("button", { name: "Show all projects" }).click();
  await expect(cards).toHaveCount(3);
  await page.getByLabel("Sort by").selectOption("az");
  await expect(cards.first()).toContainText("Bank of Ceylon");
  await page.getByLabel("Sort by").selectOption("za");
  await expect(cards.first()).toContainText("Labour Office");
  await page.getByRole("searchbox").fill("steel");
  await expect(cards).toHaveCount(1);
  await expect(cards.first().getByRole("link")).toHaveAttribute(
    "href",
    /Project%20enquiry/,
  );
});

test("careers filters expressions of interest and provides an email application", async ({
  page,
}) => {
  await page.goto("/careers");
  await expect(page.getByLabel("Application information")).toContainText(
    "rather than advertised vacancies",
  );
  const cards = page.locator(".listing-card");
  await expect(cards).toHaveCount(4);
  await page
    .getByLabel("Work area", { exact: true })
    .selectOption("Building systems");
  await expect(cards).toHaveCount(2);
  await page
    .getByLabel("Discipline", { exact: true })
    .selectOption("Electrical");
  await expect(cards).toHaveCount(1);
  await expect(
    cards.getByRole("link", { name: "Introduce yourself" }),
  ).toHaveAttribute(
    "href",
    /Career%20expression%20of%20interest%3A%20Electrical/,
  );
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(cards).toHaveCount(4);
  await page.getByRole("searchbox").fill("finishing");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText("Interior works");
});

test("careers is eighth and Selected Work starts at the left gutter", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const sections = page.locator("#main > section");
  await expect(sections.nth(6)).toHaveAttribute("id", "approach");
  await expect(sections.nth(7)).toHaveAttribute(
    "aria-labelledby",
    "career-title",
  );
  await expect(sections.nth(7).locator(".eyebrow span")).toHaveText("08 /");
  const alignment = await page.locator("#projects").evaluate((section) => {
    const heading = section.querySelector("h2")!;
    return Math.abs(
      heading.getBoundingClientRect().left -
        section.getBoundingClientRect().left,
    );
  });
  expect(alignment).toBeLessThan(2);
  await expect(
    page.getByRole("link", { name: "Project portfolio", exact: true }),
  ).toHaveClass(/portfolio-button/);
});

for (const width of [320, 768, 1024, 1920, 2560]) {
  test(`directory pages remain fluid at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/projects", "/careers"]) {
      await page.goto(path);
      await expect(page.getByRole("searchbox")).toBeVisible();
      await page.locator(".listing-card").last().scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      const bounds = await page.locator("#main").boundingBox();
      expect(bounds!.width).toBeGreaterThan(width * 0.85);
    }
  });
}

test("homepage, project portfolio, and careers are navigable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Engineering what comes next." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore our work" }).click();
  await expect(
    page.getByRole("heading", { name: "Places that matter." }),
  ).toBeInViewport();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Our work, in focus." }),
  ).toBeVisible();
  await expect(
    page.getByRole("search", { name: "Projects", exact: true }),
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
      page.getByRole("heading", { name: "Engineering what comes next." }),
    ).toBeVisible();
    await page
      .getByRole("heading", {
        name: "Let's build what’s next.",
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

test("discipline selectors update the image and enquiry", async ({ page }) => {
  await page.goto("/");
  const bridge = page.getByRole("button", { name: "03 Bridge construction" });
  await bridge.click();
  await expect(bridge).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText(
      "Civil engineering and construction for bridge infrastructure.",
    ),
  ).toBeVisible();
  await expect(
    page.getByAltText("Illustrative bridge construction in Sri Lanka"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discuss this service" }),
  ).toHaveAttribute("href", /Enquiry%3A%20Bridge%20construction/);
  await page.getByRole("button", { name: "06 House construction" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByAltText("Illustrative house construction in Sri Lanka"),
  ).toBeVisible();
});

test("location map and directions use the supplied business pin", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#location").scrollIntoViewIfNeeded();
  await expect(page.locator("#location iframe")).toHaveAttribute(
    "src",
    "https://www.google.com/maps?cid=10645268318811382215&output=embed",
  );
  await expect(
    page.getByRole("link", { name: /Open in Google Maps/ }),
  ).toHaveAttribute("href", "https://maps.app.goo.gl/wJrPxJbBJ46a32pR7");
  await expect(
    page.getByRole("link", { name: /Get directions/ }),
  ).toHaveAttribute("href", "https://maps.app.goo.gl/wJrPxJbBJ46a32pR7");
});

test("scroll progress tracks the page and career imagery reveals gradually", async ({
  page,
}) => {
  await page.goto("/");
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; }",
  });
  const progress = () =>
    page
      .locator(".scroll-progress-fill")
      .evaluate(
        (element) => new DOMMatrix(getComputedStyle(element).transform).a,
      );
  await expect.poll(progress).toBeLessThan(0.01);
  const image = page.locator(".career-image-reveal");
  const opacity = () =>
    image.evaluate((element) => Number(getComputedStyle(element).opacity));
  const top = await image.evaluate(
    (element) => element.getBoundingClientRect().top + window.scrollY,
  );
  await page.evaluate(
    (top) => window.scrollTo(0, top - innerHeight * 0.95),
    top,
  );
  await expect.poll(opacity).toBeLessThan(0.25);
  await page.evaluate(
    (top) => window.scrollTo(0, top - innerHeight * 0.7),
    top,
  );
  await expect.poll(opacity).toBeGreaterThan(0.4);
  await expect.poll(opacity).toBeLessThan(0.8);
  await page.evaluate(
    (top) => window.scrollTo(0, top - innerHeight * 0.4),
    top,
  );
  await expect.poll(opacity).toBe(1);
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await expect.poll(progress).toBeGreaterThan(0.99);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(opacity).toBe(1);
});

for (const width of [375, 1280]) {
  test(`process flow follows scrolling at ${width}px and respects reduced motion`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.addStyleTag({
      content: "html { scroll-behavior: auto !important; }",
    });
    const flow = page.locator(".process-flow");
    const dimensions = await flow.evaluate((element) => ({
      top: element.getBoundingClientRect().top + scrollY,
      height: element.getBoundingClientRect().height,
    }));
    const scale = () =>
      page
        .locator(".process-rail-fill")
        .evaluate(
          (element) => new DOMMatrix(getComputedStyle(element).transform).d,
        );
    await page.evaluate(
      ({ top }) => window.scrollTo(0, top - innerHeight * 0.8),
      dimensions,
    );
    await expect.poll(scale).toBeLessThan(0.05);
    await page.evaluate(
      ({ top, height }) =>
        window.scrollTo(
          0,
          top - innerHeight * 0.75 + (height + innerHeight * 0.15) * 0.5,
        ),
      dimensions,
    );
    await expect.poll(scale).toBeGreaterThan(0.45);
    await expect.poll(scale).toBeLessThan(0.55);
    await expect(flow.locator('li[data-complete="true"]')).toHaveCount(2);
    await expect(flow.locator('li[data-current="true"]')).toHaveCount(1);
    await expect(flow.locator(".process-cursor")).toHaveCSS("opacity", "1");
    const cursorProgress = await flow
      .locator(".process-cursor")
      .evaluate((element) => {
        const rail = element.parentElement!;
        return (
          new DOMMatrix(getComputedStyle(element).transform).f /
          rail.getBoundingClientRect().height
        );
      });
    expect(cursorProgress).toBeGreaterThan(0.45);
    expect(cursorProgress).toBeLessThan(0.55);
    await page.evaluate(
      ({ top, height }) =>
        window.scrollTo(0, top + height - innerHeight * 0.55),
      dimensions,
    );
    await expect.poll(scale).toBe(1);
    await expect(flow.locator('li[data-complete="true"]')).toHaveCount(4);
    await expect(flow.locator(".process-cursor")).toHaveCSS("opacity", "0");
    await page.evaluate(
      ({ top }) => window.scrollTo(0, top - innerHeight * 0.8),
      dimensions,
    );
    await expect.poll(scale).toBeLessThan(0.05);
    await expect(flow.locator('li[data-current="true"]')).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(scale).toBe(1);
    await expect(flow.locator('li[data-complete="true"]')).toHaveCount(4);
    await expect(flow.locator(".process-cursor")).toHaveCSS("opacity", "0");
  });
}

test("heading decoding preserves accessible text and settles precisely", async ({
  page,
}) => {
  await page.goto("/");
  const heading = page.getByRole("heading", {
    name: "Expertise, across every discipline.",
  });
  const decode = heading.locator(".decode-text");
  await heading.scrollIntoViewIfNeeded();
  await expect(decode).toHaveAttribute("data-decoding", "true");
  await expect(heading).toHaveAccessibleName(
    "Expertise, across every discipline.",
  );
  await expect(decode).toHaveAttribute("data-decoding", "false");
  expect(await decode.locator(".decode-glyph").allTextContents()).toEqual(
    "every discipline.".split(""),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await heading.scrollIntoViewIfNeeded();
  await expect(decode).toHaveAttribute("data-decoding", "false");
  await expect(heading).toHaveAccessibleName(
    "Expertise, across every discipline.",
  );
});

test("selected photography has restrained parallax that stops for reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; }",
  });
  const photo = page.locator(".process-photo");
  const top = await photo.evaluate(
    (element) => element.getBoundingClientRect().top + scrollY,
  );
  const translation = () =>
    photo
      .locator(".parallax-inner")
      .evaluate(
        (element) => new DOMMatrix(getComputedStyle(element).transform).f,
      );
  await page.evaluate(
    (top) => window.scrollTo(0, top - innerHeight * 0.9),
    top,
  );
  await expect.poll(translation).toBeLessThan(-5);
  const before = await translation();
  await page.evaluate(
    (top) => window.scrollTo(0, top - innerHeight * 0.2),
    top,
  );
  await expect.poll(translation).toBeGreaterThan(before + 5);
  await expect
    .poll(async () => Math.abs(await translation()))
    .toBeLessThanOrEqual(12);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(translation).toBe(0);
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

test("autoplay film handles unavailable media", async ({ page }) => {
  await page.route("**/*.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(
    page.getByAltText("Opening frame of the illustrative construction montage"),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText("film is unavailable");
  await expect(
    page.getByRole("heading", { name: "Engineering what comes next." }),
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
test("hero film autoplays and pauses out of view", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Pause film" })).toBeVisible({
    timeout: 15000,
  });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Play hero film" }),
  ).toBeAttached();
});

test("WhatsApp contact remains available across pages", async ({ page }) => {
  for (const path of ["/", "/projects", "/careers"]) {
    await page.goto(path);
    const link = page.getByRole("link", {
      name: "Let's talk on WhatsApp (opens in a new tab)",
    });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/94777552416\?text=/,
    );
    await expect(link).toHaveAttribute("target", "_blank");
  }
});

test("visitor-paused hero film stays paused after scrolling back", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause film" }).click();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Play hero film" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.locator("video").evaluate((video: HTMLVideoElement) => video.paused),
    )
    .toBe(true);
});

test("mobile hero autoplays the mobile film", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Pause film" })).toBeVisible({
    timeout: 15000,
  });
  await expect(page.locator("video")).toHaveAttribute(
    "src",
    "/assets/dks-hero-mobile.mp4",
  );
});
