import { expect, test } from '@playwright/test'

test.describe('public site', () => {
  test('renders the working homepage experience', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Career Path Brief/)
    await expect(page.getByRole('heading', { level: 1, name: 'Career Path Brief' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search the site' })).toBeVisible()
    await expect(page.getByText('Start with the work, not the course')).toBeVisible()
  })

  test('renders unique SEO and source evidence on a career page', async ({ page }) => {
    await page.goto('/careers/medical-assistant')
    await expect(page).toHaveTitle(/Medical Assistant: Training, Requirements, Pay & Outlook/)
    await expect(page.getByRole('heading', { level: 1, name: 'How to Become a Medical Assistant' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/careers\/medical-assistant$/)
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expect(page.locator('.editorial-figure')).toHaveCount(2)
    await expect(page.locator('.editorial-figure-lead img')).toBeVisible()
    await expect(page.locator('.image-credit').first()).toContainText('Pexels License')
    await expect(page.getByRole('heading', { name: 'Primary references' })).toBeVisible()
  })

  test('keeps search noindex and returns useful results', async ({ page }) => {
    await page.goto('/search?q=pharmacy')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    await expect(page.getByText(/results for "pharmacy"/)).toBeVisible()
    await expect(page.getByRole('link', { name: 'How to Become a Pharmacy Technician', exact: true })).toBeVisible()
  })

  test('calculates a transparent training total', async ({ page }) => {
    await page.goto('/tools/training-cost-planner')
    await expect(page.getByText('$11,250')).toBeVisible()
    const tuition = page.getByLabel('Tuition')
    await tuition.fill('7000')
    await expect(page.getByText('$11,750')).toBeVisible()
  })

  for (const viewport of [{ width: 360, height: 800 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
    test(`has no page-level horizontal overflow at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto('/')
      const dimensions = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }))
      expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1)
    })
  }
})
