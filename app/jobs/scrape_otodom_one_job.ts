import FailedApartment from '#models/failed_apartment'
import SalesApartment from '#models/sales_apartment'
import type { Characteristic } from '#services/graphql.generated'
import { otodomClient } from '#services/otodom/query'
import { Job } from '@rlanz/bull-queue'

interface ScrapeOtodomOneJobPayload {
  id: string
}

function findCharacteristics<T extends string>(
  characteristics: Characteristic[],
  keys: T[]
): { [K in T]?: string } {
  const found: Partial<{ [K in T]: string }> = {}
  keys.forEach((key) => {
    const characteristic = characteristics.find((char) => char.key === key)
    if (characteristic?.value) {
      found[key] = characteristic.value
    }
  })
  return found
}

export default class ScrapeOtodomOneJob extends Job {
  // This is the path to the file that is used to create the job
  static get $$filepath() {
    return import.meta.url
  }

  /**
   * Base Entry point
   */
  async handle(payload: ScrapeOtodomOneJobPayload) {
    const ad = await otodomClient.Advert({
      id: Number.parseInt(payload.id),
    })

    const advert = ad.advert

    if (
      !advert?.id ||
      !advert.url ||
      !advert.title ||
      !advert.description ||
      !advert.characteristics
    ) {
      throw new Error(
        JSON.stringify(
          {
            'advert.id': advert?.id ? null : 'missing',
            'advert.url': advert?.url ? null : 'missing',
            'advert.title': advert?.title ? null : 'missing',
            'advert.description': advert?.description ? null : 'missing',
            'advert.characteristics': advert?.characteristics ? null : 'missing',
          },
          null,
          2
        )
      )
    }

    const characteristics = findCharacteristics(
      advert.characteristics.filter((c) => c !== null),
      ['price', 'rooms_num', 'm', 'market', 'building_type', 'rent']
    )

    if (!characteristics.m || !advert.locationDetails?.address?.city?.name) {
      throw new Error(
        JSON.stringify(
          {
            'characteristics.m': characteristics.m ? null : 'missing',
            'advert.locationDetails.address.city.name': advert.locationDetails?.address?.city?.name
              ? null
              : 'missing',
          },
          null,
          2
        )
      )
    }

    const categoryId = advert.category?.id?.toString()

    const ignoredCategoriesIDs = [
      '102',
      '202',
      '302',
      '402',
      '602',
      '401',
      '601',
      '502',
      '501',
      '701',
      '702',
    ]

    if (ignoredCategoriesIDs.includes(categoryId ?? '')) {
      this.logger.debug('Advert is in ignored category: %s', categoryId ?? '')

      return
    }

    if (
      // Mieszkania
      categoryId !== '101' &&
      // Domy
      categoryId !== '201'
    ) {
      throw new Error(
        `Advert is not a sale apartment, but a ${advert.category?.name?.at(0)?.value ?? ''}:{${categoryId}}`
      )
    }

    await SalesApartment.updateOrCreate(
      {
        url: advert.url,
      },
      {
        area: Number.parseInt(characteristics.m),
        cityName: advert.locationDetails.address.city.name,
        description: advert.description,
        externalId: advert.id.toString(),
        price: characteristics.price ? Number.parseInt(characteristics.price) : undefined,
        location: `${advert.locationDetails.address.street?.name ?? ''}${advert.locationDetails.address.street?.number ? ` ${advert.locationDetails.address.street.number}` : ''}`,
        title: advert.title,
        url: advert.url,
      }
    )
  }

  /**
   * This is an optional method that gets called when the retries has exceeded and is marked failed.
   */
  async rescue(payload: ScrapeOtodomOneJobPayload, error: Error) {
    let url = null

    try {
      const ad = await otodomClient.Advert({
        id: Number.parseInt(payload.id),
      })

      url = ad.advert?.url
    } catch (e) {
      this.logger.error(e)
    }

    await FailedApartment.create({
      error: error.message,
      externalId: payload.id,
      url,
    })
  }
}
