import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show password form on initial load', async ({ page }) => {
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /homeConnect/ })).toBeVisible();
  });

  test('should show IP form after successful password entry', async ({ page }) => {
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /homeConnect/ }).click();
    
    // Should eventually show IP form
    await expect(page.getByLabel('Code')).toBeVisible();
    await expect(page.getByRole('button', { name: /homeScanQrCode/ })).toBeVisible();
  });

  test('should allow manual IP entry and connection', async ({ page }) => {
    // Mock the IP detection API to fail so we get the manual form
    await page.route('**/api/*', route => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Not found' }),
      });
    });

    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /homeConnect/ }).click();
    
    // Wait for IP form to appear
    await page.getByLabel('Code').waitFor();
    
    // Enter IP ending
    await page.getByLabel('Code').fill('100');
    await page.getByRole('button', { name: /homeConnect/ }).click();
    
    // Should attempt to navigate (URL will depend on actual IP detection)
    await expect(page).not.toHaveURL('/');
  });

  test('should show QR scan button when IP form is visible', async ({ page }) => {
    // Mock the IP detection API to fail so we get the manual form
    await page.route('**/api/*', route => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Not found' }),
      });
    });

    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /homeConnect/ }).click();
    
    // Wait for IP form to appear
    await page.getByLabel('Code').waitFor();
    
    // Should show QR scan button
    await expect(page.getByRole('button', { name: /homeScanQrCode/ })).toBeVisible();
  });
});