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

  test('update', async ({ assert }) => {
    const salesApartment = await SalesApartment.create({
      title: 'Test',
      url: 'test-2',
      location: 'test',
      price: 100,
      status: 'active',
      description: 'test',
      externalId: '65089808',
      cityName: 'Wrocław',
    })
    assert.isDefined(salesApartment.id)

    salesApartment.title = 'Test2'

    await salesApartment.save()

    const salesApartment2 = await SalesApartment.findOrFail(salesApartment.id)

    assert.isDefined(salesApartment2.id)
    assert.equal(salesApartment2.title, 'Test2')

    const job = await salesApartment2.getRepeatableJob()

    assert.isDefined(job)
  })
})
