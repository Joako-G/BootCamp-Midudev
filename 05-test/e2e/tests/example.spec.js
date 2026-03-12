// @ts-check
import { test, expect } from '@playwright/test';


//1. Lo mas recomendable es usar Roles, aria
//2. etiquetas de texto, placeholders, nombres
//3. data-testid
//4. selectores de CSS (ultimo recurso)
test('Buscar empleos y aplicar a una oferta', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const searchInput = page.getByRole('searchbox')
  await searchInput.fill('React')

  await page.getByRole('button', { name: 'Buscar' }).click()

  const jobsCards = page.locator('.job-listing-card')

  await expect(jobsCards.first()).toBeVisible()

  const firstJobTitle = jobsCards.first().locator('h3')
  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')

  await page.getByRole('button', { name: 'Login' }).click()

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
  await applyButton.click()

  page.getByRole('button', { name: 'Aplicado' }).first()

}) 