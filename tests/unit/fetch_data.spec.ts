import { test } from '@japa/runner'
import { fetchData } from '../../app/services/olxApiClient/utils/fetch_data.js'
test.group('Fetchdata', () => {
  test('from OLX', async ({ assert }) => {
    const data = await fetchData('https://www.olx.pl/api/v1/offers/?query=iphone%208')

    const dataObject = JSON.parse(data)

    assert.isArray(dataObject.data)
    assert.notEmpty(dataObject.data)
  })
})
