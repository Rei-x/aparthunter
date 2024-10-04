import { otodomClient } from '#services/otodom/query'
import { Job } from '@rlanz/bull-queue'
import queue from '@rlanz/bull-queue/services/main'
import ScrapeOtodomOneJob from './scrape_otodom_one_job.js'

export default class ScrapeOtodomApartmentsJob extends Job {
  // This is the path to the file that is used to create the job
  static get $$filepath() {
    return import.meta.url
  }

  /**
   * Base Entry point
   */
  async handle() {
    const ads = await otodomClient.SearchAds()

    for (const ad of ads.searchAds?.items ?? []) {
      if (!ad?.id) {
        continue
      }

      await queue.dispatch(ScrapeOtodomOneJob, {
        id: ad.id,
      })
    }
  }

  /**
   * This is an optional method that gets called when the retries has exceeded and is marked failed.
   */
  async rescue() {}
}
