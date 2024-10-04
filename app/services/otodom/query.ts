import { getSdk } from '#services/graphql.generated'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://www.otodom.pl/api/query', {
  headers: {
    'User-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0',
  },
})

export const otodomClient = {
  ...getSdk(client),
}
