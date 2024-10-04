import { z } from 'zod'
import { getNextJsData } from './get_nextjs_data.js'

const schema = z.object({
  ad: z.object({
    __typename: z.literal('Advert'),
    id: z.number(),
  }),
})

export const urlToData = async (url: string) => {
  const data = await getNextJsData(url)

  return schema.parse(data)
}
