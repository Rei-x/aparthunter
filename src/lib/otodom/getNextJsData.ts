import * as cheerio from "cheerio";
import { fetchData } from "../olxApiClient/utils/fetchData";

export const getNextJsData = async (url: string) => {
  const data = await fetchData(url);

  const $ = cheerio.load(data);

  const script = $("script#__NEXT_DATA__").html();

  if (!script) {
    throw new Error("No script found");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = JSON.parse(script);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return json.props.pageProps;
};
