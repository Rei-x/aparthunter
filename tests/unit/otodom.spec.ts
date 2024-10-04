import { test } from '@japa/runner'
import { otodomClient } from '../../app/services/otodom/query.js'
import { getNextJsData } from '../../app/services/otodom/get_nextjs_data.js'
import { urlToData } from '#services/otodom/url_to_data'

test.group('getNextJsData', () => {
  test('otodom', async ({ assert }) => {
    assert
      .snapshot(
        await getNextJsData(
          'https://www.otodom.pl/pl/oferta/mieszkanie-3-pokoje-z-ogrodkiem-osiedle-malownicze-ID4p6PC'
        ).then((d) => d.ad)
      )
      .match()
  }).skip()

  test('search ads', async ({ assert }) => {
    const ads = await otodomClient.SearchAds()

    assert.isAbove(ads.searchAds?.items?.length ?? 0, 0)
  })

  test('url to data', async ({ assert }) => {
    const data = await urlToData(
      'https://www.otodom.pl/pl/oferta/mieszkanie-3-pokoje-z-ogrodkiem-osiedle-malownicze-ID4p6PC'
    )

    assert.equal(data.ad.id, 65089808)
  })

  test('expired apartment', async ({ assert }) => {
    const ad = await otodomClient.Advert({
      id: 65089808,
    })

    assert.equal(ad.advert?.status, 'removed_by_user')
  })

  const urls = [
    'https://www.otodom.pl/pl/oferta/mieszkanie-3-pokoje-z-ogrodkiem-osiedle-malownicze-ID4p6PC',
    'https://www.otodom.pl/pl/oferta/54m2-z-tarasem-w-kamienicy-na-placu-pereca-ID4oMfF',
    'https://www.otodom.pl/pl/oferta/sprzedam-3-pokojowe-mieszkanie-52m2-ID4ozfv',
    'https://www.otodom.pl/pl/oferta/klecina-3-pok-sloneczne-opcjonalnie-dzialka-ID4pea3',
    'https://www.otodom.pl/pl/oferta/mieszkanie-3-pokojowe-sloneczne-stablowice-ID4p7aj',
    'https://www.otodom.pl/pl/oferta/mieszkanie-57-5-m2-umeblowane-wroclaw-ul-zatorska-ID4oPlK',
    'https://www.otodom.pl/pl/oferta/wysoka-3-pokoje-oddzielna-kuchnia-garaz-klima-ID4o5sJ',
    'https://www.otodom.pl/pl/oferta/mieszkanie-zeromskiego-56-6m-2-pokoje-kuchnia-ID4op5Z',
    'https://www.otodom.pl/pl/oferta/bez-prowizji-mieszkanie-na-powstancow-slaskich-ID4dZl7',
    'https://www.otodom.pl/pl/oferta/mieszkanie-wroclaw-krzyki-54-1m2-ID4psPF',
    'https://www.otodom.pl/pl/oferta/na-sprzedaz-mieszkanie-w-doskonalej-lokalizacji-ID4psc1',
    'https://www.otodom.pl/pl/oferta/kup-i-zarabiaj-wynajete-3-pokoje-przy-parku-ID4pdue',
    'https://www.otodom.pl/pl/oferta/2-pokoje-osobna-kuchnia-30m-taras-zielona-okolica-ID4oXo7',
    'https://www.otodom.pl/pl/oferta/dwa-pokoje-z-ogrodkiem-wysoki-standard-ID4pbUu',
    'https://www.otodom.pl/pl/oferta/ogloszenie-prywatne-mieszkanie-2pokojowe-nadodrze-ID4nNwA',
    'https://www.otodom.pl/pl/oferta/2-pokoje-kuchnia-52m2-duzy-balkon-gorlicka88-h3m-ID4o8uo',
    'https://www.otodom.pl/pl/oferta/50m2-2-poziomowe-2-miejsca-parkingowe-taras-10m-ID4paMl',
    'https://www.otodom.pl/pl/oferta/zielone-stablowice-3-pokoje-ogrodek-parking-ID4nNTX',
    'https://www.otodom.pl/pl/oferta/supernova-mieszkanie-3-pokojowe-ul-gagarina-ID4pozn',
    'https://www.otodom.pl/pl/oferta/komfortowe-mieszkanie-2pokoje-z-tarasem30m-maslice-ID4owBX',
    'https://www.otodom.pl/pl/oferta/atrakcyjne-3-pokoje-z-prywatnym-ogrodem-i-garazem-ID4pdyK',
    'https://www.otodom.pl/pl/oferta/wielofunkcjonalne-mieszkanie-pilna-sprzedaz-ID4mQ2H',
    'https://www.otodom.pl/pl/oferta/3-pokoje-balkon-gotowe-optymalna-lokalizacja-ID4oK7W',
  ]

  urls.map((url) =>
    test(`check if ad is expired ${url}`, async ({ assert }) => {
      const adId = await urlToData(url).then((d) => d.ad.id)

      const ad = await otodomClient.Advert({
        id: adId,
      })

      assert.oneOf(ad.advert?.status, ['removed_by_user', 'outdated'])
    })
  )
})
