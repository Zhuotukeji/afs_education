import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const output = new URL('../test-results/visual/', import.meta.url)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })

async function loadLazyImages(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const step = Math.max(320, Math.floor(window.innerHeight * 0.75))
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0), undefined, { timeout: 60_000 })
}

for (const viewport of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await loadLazyImages(page)
  const report = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heroImageReady: (() => { const image = document.querySelector('.home-hero img'); return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0 })(),
    failedImages: Array.from(document.images).filter((image) => !image.complete || image.naturalWidth === 0).length,
    emptyTextNodes: Array.from(document.querySelectorAll('h1,h2,h3,button,a')).filter((element) => !element.textContent?.trim() && !element.getAttribute('aria-label')).length,
  }))
  if (report.scrollWidth > report.clientWidth + 1 || !report.heroImageReady || report.failedImages > 0 || report.emptyTextNodes > 0) {
    throw new Error(`${viewport.name} visual check failed: ${JSON.stringify(report)}`)
  }
  await page.screenshot({ path: fileURLToPath(new URL(`home-${viewport.name}.png`, output)), fullPage: true })
  await page.goto('http://localhost:3000/careers/medical-assistant', { waitUntil: 'networkidle' })
  await loadLazyImages(page)
  await page.screenshot({ path: fileURLToPath(new URL(`career-${viewport.name}.png`, output)), fullPage: true })
  await page.close()
}

await browser.close()
console.log('Visual checks passed for desktop and mobile; screenshots are in test-results/visual.')
