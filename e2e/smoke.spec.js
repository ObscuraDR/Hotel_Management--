import { test, expect } from "@playwright/test";

const LANDING_PATHS = [
  "/home",
  "/home/about",
  "/home/booking",
  "/home/demo",
  "/home/features",
  "/home/features/room-management",
  "/home/features/booking-management",
  "/home/stats",
  "/home/testimonials",
];

const STAFF_PATHS = [
  { path: "/", hint: /System Overview|LuxeHotel Management/i },
  { path: "/rooms", hint: /Room (List|Management)/i },
  { path: "/floormap", hint: /Floor Map/i },
  { path: "/bookings", hint: /Booking (List|Management)/i },
  { path: "/calendar", hint: /Booking Calendar/i },
  { path: "/customers", hint: /Customer (List|Management)/i },
  { path: "/staff", hint: /Staff (List|Management)/i },
  { path: "/invoices", hint: /Invoice (List|Management)/i },
  { path: "/profile", hint: /My Profile/i },
  { path: "/accounts", hint: /System Accounts|Account Management/i },
];

async function staffLogin(page) {
  await page.goto("/login");
  await page.getByPlaceholder("admin@luxehotel.com").fill("admin@luxehotel.com");
  await page.locator('input[type="password"]').first().fill("admin123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL(/\/$/);
}

test.describe("Marketing / public", () => {
  for (const path of LANDING_PATHS) {
    test(`loads ${path} without crash`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(path);
      await expect(page.locator("main")).toBeVisible();
      expect(errors, `page errors on ${path}: ${errors.join("; ")}`).toHaveLength(0);
    });
  }

  test("unknown path redirects to /home", async ({ page }) => {
    await page.goto("/this-route-does-not-exist-xyz");
    await expect(page).toHaveURL(/\/home\/?$/);
  });

  test("invalid feature slug redirects to feature list", async ({ page }) => {
    await page.goto("/home/features/not-a-real-slug");
    await expect(page).toHaveURL(/\/home\/features\/?$/);
  });

  test("staff login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("staff register page", async ({ page }) => {
    await page.goto("/register");
    await expect(page.locator("body")).toContainText(/register|create|account/i);
  });
});

test.describe("Guest portal (public + auth redirect)", () => {
  test("guest home and room browse", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/guest");
    await expect(page.locator("body")).toBeVisible();
    await page.goto("/guest/rooms");
    await expect(page.locator("body")).toBeVisible();
    expect(errors).toHaveLength(0);
  });

  test("guest bookings redirects to login when not signed in", async ({ page }) => {
    await page.goto("/guest/bookings");
    await expect(page).toHaveURL(/\/guest\/login/);
  });

  test("guest profile redirects to login when not signed in", async ({ page }) => {
    await page.goto("/guest/profile");
    await expect(page).toHaveURL(/\/guest\/login/);
  });

  test("guest login page renders", async ({ page }) => {
    await page.goto("/guest/login");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText("Welcome back! Please sign in.")).toBeVisible();
    await expect(page.locator('button[type="submit"]').filter({ hasText: "Sign In" })).toBeVisible();
  });

  test("guest register page renders", async ({ page }) => {
    await page.goto("/guest/register");
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Staff app after login (admin)", () => {
  test("all main modules open and stay authenticated", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));

    await staffLogin(page);

    for (const { path, hint } of STAFF_PATHS) {
      await page.goto(path);
      await expect(page).not.toHaveURL(/\/login$/);
      await expect(page.locator("body")).toContainText(hint);
    }

    expect(errors, `page errors: ${errors.join("; ")}`).toHaveLength(0);
  });
});
