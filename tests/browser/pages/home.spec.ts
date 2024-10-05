import { test } from '@japa/runner'

test.group('Pages home', () => {
  test('smoke test', async ({ visit }) => {
    const page = await visit('/')
    await page.assertTitleContains('Homepage')
  })
})
