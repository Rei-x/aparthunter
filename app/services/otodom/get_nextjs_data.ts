import * as cheerio from 'cheerio'
import { fetchData } from '../olxApiClient/utils/fetch_data.js'

export const getNextJsData = async (url: string) => {
  const data = await fetchData(url)

  const $ = cheerio.load(data)

  const script = $('script#__NEXT_DATA__').html()

  if (!script) {
    throw new Error('No script found')
  }

  const json = JSON.parse(script)

  return json.props.pageProps as Record<string, unknown>
}
