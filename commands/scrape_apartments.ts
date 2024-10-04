import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import queue from '@rlanz/bull-queue/services/main'
import ScrapeOtodomApartmentsJob from '../app/jobs/scrape_otodom_apartments_job.js'

export default class ScrapeApartments extends BaseCommand {
  static commandName = 'scrape:apartments'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    this.logger.info('Dispatching the job...')

    const job = await queue.dispatch(ScrapeOtodomApartmentsJob, undefined)

    this.logger.info('Job dispatched successfully')
    this.logger.info(`Job id: ${job.id}`)
  }
}
