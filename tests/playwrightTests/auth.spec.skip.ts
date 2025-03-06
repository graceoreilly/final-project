// // tests/auth.spec.ts
// import { test, expect } from '@playwright/test';

// // Test data - use different emails per test run to avoid conflicts
// const testEmail = `test-user-${Date.now()}@example.com`;
// const testPassword = 'Secure123!';
// const testName = 'Test User';

// test.describe('Authentication Flow', () => {
//   test.beforeEach(async ({ page }) => {
//     // Go to homepage before each test
//     await page.goto('http://localhost:3001/');
//   });

//   test('should allow a new user to sign up', async ({ page }) => {
//     // Navigate to signup page (update selector based on your UI)
//     await page.click('text=Sign up');

//     // Wait for signup form to appear
//     await page.waitForSelector('form');

//     // Fill out the signup form
//     await page.fill('input[name="name"]', testName);
//     await page.fill('input[name="email"]', testEmail);
//     await page.fill('input[name="password"]', testPassword);
//     await page.fill('input[name="confirmPassword"]', testPassword);

//     // Submit the form
//     await page.click('button[type="submit"]');

//     // Verify successful signup - either by URL change, welcome message, or being logged in
//     await expect(page.locator('text=Welcome')).toBeVisible({ timeout: 5000 });

//     // Verify user-specific content appears (e.g., their name)
//     await expect(page.locator(`text=${testName}`)).toBeVisible();
//   });

//   test('should prevent signup with existing email', async ({ page }) => {
//     // This test assumes the previous test has already created a user

//     // Navigate to signup page
//     await page.click('text=Sign up');

//     // Fill form with the same email
//     await page.fill('input[name="name"]', 'Another User');
//     await page.fill('input[name="email"]', testEmail); // Same email as before
//     await page.fill('input[name="password"]', 'Different123!');
//     await page.fill('input[name="confirmPassword"]', 'Different123!');

//     // Submit form
//     await page.click('button[type="submit"]');

//     // Verify error message
//     await expect(page.locator('text=Email already exists')).toBeVisible();
//   });

//   test('should allow existing user to sign in', async ({ page }) => {
//     // Navigate to signin page
//     await page.click('text=Sign in');

//     // Fill sign in form
//     await page.fill('input[name="email"]', testEmail);
//     await page.fill('input[name="password"]', testPassword);

//     // Submit form
//     await page.click('button[type="submit"]');

//     // Verify successful login
//     await expect(page.locator('text=Welcome back')).toBeVisible({ timeout: 5000 });

//     // Verify user is logged in and can access protected features
//     await expect(page.locator('text=My Memories')).toBeVisible();
//   });

//   test('should show error for incorrect password', async ({ page }) => {
//     // Navigate to signin page
//     await page.click('text=Sign in');

//     // Fill sign in form with wrong password
//     await page.fill('input[name="email"]', testEmail);
//     await page.fill('input[name="password"]', 'WrongPassword123!');

//     // Submit form
//     await page.click('button[type="submit"]');

//     // Verify error message
//     await expect(page.locator('text=Invalid email or password')).toBeVisible();
//   });

//   test('should allow user to reset password', async ({ page }) => {
//     // Navigate to signin page
//     await page.click('text=Sign in');

//     // Click forgot password link
//     await page.click('text=Forgot password?');

//     // Fill email in reset form
//     await page.fill('input[name="email"]', testEmail);

//     // Submit form
//     await page.click('button[type="submit"]');

//     // Verify success message
//     await expect(page.locator('text=Password reset link sent')).toBeVisible();
//   });

//   test('should allow user to sign out', async ({ page }) => {
//     // First sign in
//     await page.click('text=Sign in');
//     await page.fill('input[name="email"]', testEmail);
//     await page.fill('input[name="password"]', testPassword);
//     await page.click('button[type="submit"]');

//     // Wait for sign in to complete
//     await expect(page.locator('text=My Memories')).toBeVisible();

//     // Find and click sign out button/link
//     await page.click('text=Sign out');

//     // Verify sign out was successful - user is back to logged out state
//     await expect(page.locator('text=Sign in')).toBeVisible();
//   });
// });

// // For testing authorization and protected routes
// test.describe('Authorization', () => {
//   test('should redirect unauthenticated user from protected page', async ({ page }) => {
//     // Try to directly access a protected page
//     await page.goto('/my-memories');

//     // Verify redirect to login page or access denied message
//     const currentUrl = page.url();
//     expect(currentUrl).toContain('/signin');
//   });
// });
