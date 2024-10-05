import SalesApartment from '#models/sales_apartment'
import type { HttpContext } from '@adonisjs/core/http'
import queue from '@rlanz/bull-queue/services/main'
import ScrapeOtodomApartmentsJob from '../jobs/scrape_otodom_apartments_job.js'

class SalesApartmentDTO {
  constructor(private apartment: SalesApartment) {}

  toJson() {
    return {
      id: this.apartment.id,
      externalId: this.apartment.externalId,
      title: this.apartment.title,
      url: this.apartment.url,
      location: this.apartment.location,
      price: this.apartment.price,
      description: this.apartment.description,
      area: this.apartment.area,
      cityName: this.apartment.cityName,
      createdAt: this.apartment.createdAt,
      updatedAt: this.apartment.updatedAt,
    }
  }
}

export default class SalesApartmentsController {
  async index({ inertia }: HttpContext) {
    const allApartments = await SalesApartment.all()

    return inertia.render('home', {
      props: {
        apartments: allApartments.map((s) => new SalesApartmentDTO(s).toJson()),
      },
    })
  }

  async scrape() {
    await queue.dispatch(ScrapeOtodomApartmentsJob, undefined)
  }
}
