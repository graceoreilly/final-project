import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://my-memories-omega.vercel.app/");
  await page.getByRole("button", { name: "Sign up with Google" }).click();
  await page.getByRole("textbox", { name: "Email or phone" }).click();
  await page
    .getByRole("textbox", { name: "Email or phone" })
    .fill("graceoreilly111@gmail.com");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("link", { name: "Try again" }).click();
  await page.goto("https://my-memories-omega.vercel.app/");
  await page.getByRole("link", { name: "MyMemories Logo" }).click();
  await page.getByRole("link", { name: "About Me" }).click();
  await page.getByRole("link", { name: "Timeline" }).click();
  await page.getByPlaceholder("Date").fill("2025-03-16");
  await page.getByRole("textbox", { name: "Title" }).click();
  await page.getByRole("textbox", { name: "Title" }).fill("Grace turns 30");
  await page.getByRole("textbox", { name: "Description" }).click();
  await page.getByRole("textbox", { name: "Description" }).press("CapsLock");
  await page
    .getByRole("textbox", { name: "Description" })
    .fill("Grace turns the big 3 0");
  await page.locator('input[type="file"]').click();
  await page.getByRole("button", { name: "Add Memory" }).click();
  await page.goto("https://my-memories-omega.vercel.app/timeline");
  await page.getByRole("link", { name: "Timeline" }).click();
  await page.getByRole("link", { name: "Calendar" }).click();
  await page.locator("div").filter({ hasText: /^6$/ }).first().click();
  await page.getByRole("textbox", { name: "Title" }).click();
  await page.getByRole("textbox", { name: "Title" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Title" }).fill("Final ");
  await page.getByRole("textbox", { name: "Title" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Title" }).fill("Final Project week");
  await page.getByRole("button", { name: "Add Event", exact: true }).click();
  await page.getByRole("link", { name: "Assistant" }).click();
  await page.getByRole("button", { name: "Sign Out" }).click();
});
