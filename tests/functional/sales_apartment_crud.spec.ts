import SalesApartment from '#models/sales_apartment'
import { test } from '@japa/runner'

test.group('Sales apartment crud', () => {
  test('create', async ({ assert }) => {
    const salesApartment = await SalesApartment.create({
      title: 'Test',
      url: 'test',
      location: 'test',
      price: 100,
      description: 'test',
      externalId: 'external-id',
      cityName: 'Wrocław',
    })

    assert.isDefined(salesApartment.id)
  })

  test('delete', async ({ assert }) => {
    const salesApartment = await SalesApartment.create({
      title: 'Test',
      url: 'test-2',
      location: 'test',
      price: 100,
      description: 'test',
      externalId: 'external-id-2',
      cityName: 'Wrocław',
    })

    assert.isDefined(salesApartment.id)

    await salesApartment.delete()
  })
})
