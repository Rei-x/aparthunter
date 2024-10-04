import { apiClient } from '../../app/services/olxApiClient/api/index.js'
import { categories } from '../../app/services/olxApiClient/api/constants.js'
import { test } from '@japa/runner'

test.group('api test', () => {
  test('requests succeed for rent', async ({ assert }) => {
    const offers = await apiClient.offers.list({
      category_id: categories.ApartmentsRent,
      limit: 40,
      offset: 0,
    })

    assert.isAbove(offers.data.length, 0)
  })

  test('requests succeed for sale', async ({ assert }) => {
    const offers = await apiClient.offers.list({
      category_id: categories.ApartmentsSale,
      limit: 40,
      offset: 200,
    })

    assert.isAbove(offers.data.length, 0)
  })

  test('expected fields are present', async ({ assert }) => {
    const offers = await apiClient.offers.list({
      category_id: categories.ApartmentsSale,
      limit: 40,
      offset: 0,
    })

    const offer = offers.data[0]

    assert.isArray(offer.photos)
    assert.isString(offer.offer_type)
  })
})
