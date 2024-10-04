import { DateTime } from 'luxon'
import { afterDelete, afterSave, BaseModel, column } from '@adonisjs/lucid/orm'
import queue from '@rlanz/bull-queue/services/main'
import ScrapeOtodomOneJob from '../jobs/scrape_otodom_one_job.js'

export default class SalesApartment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare externalId: string

  @column()
  declare title: string

  @column()
  declare url: string

  @column()
  declare location: string

  @column()
  declare price: number

  @column()
  declare status: 'active' | 'removed_by_user' | 'outdated'

  @column()
  declare description: string
  @column()
  declare area: number | null

  @column()
  declare cityName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  public get repeatableKey() {
    return `saleApartmentSingle:${this.externalId}`
  }

  @afterSave()
  static async updateRecurringJob(salesApartment: SalesApartment) {
    if (salesApartment.status !== 'active') {
      await this.deleteRecurringJob(salesApartment)
    } else {
      await queue.dispatch(
        ScrapeOtodomOneJob,
        {
          id: salesApartment.externalId,
        },
        {
          repeat: {
            key: salesApartment.repeatableKey,
            every: 60 * 60 * 1000,
          },
        }
      )
    }
  }

  @afterDelete()
  static async deleteRecurringJob(salesApartment: SalesApartment) {
    await queue.get()?.removeRepeatableByKey(salesApartment.repeatableKey)
  }
}
