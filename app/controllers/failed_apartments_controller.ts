import FailedApartment from '#models/failed_apartment'
import type { HttpContext } from '@adonisjs/core/http'

class FailedApartmentDto {
  constructor(private failedApartment: FailedApartment) {}

  toJson() {
    return {
      id: this.failedApartment.id,
      createdAt: this.failedApartment.createdAt,
      updatedAt: this.failedApartment.updatedAt,
      externalId: this.failedApartment.externalId,
      url: this.failedApartment.url,
      error: this.failedApartment.error,
    }
  }
}

export default class FailedApartmentsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const allFailedApartments = await FailedApartment.all()

    return inertia.render('fails', {
      props: {
        failedApartments: allFailedApartments.map((failedApartment) =>
          new FailedApartmentDto(failedApartment).toJson()
        ),
      },
    })
  }
}
