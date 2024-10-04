import scheduler from 'adonisjs-scheduler/services/main'
import ScrapeApartments from '../commands/scrape_apartments.js'

scheduler.command(ScrapeApartments).everyMinute()
