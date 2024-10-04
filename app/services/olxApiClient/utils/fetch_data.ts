export const fetchData = async (dataUrl: string) => {
  const data = await fetch(dataUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
      'Accept': 'application/vnd.opbox-web.v2+json, application/json',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  })

  return await data.text()
}
