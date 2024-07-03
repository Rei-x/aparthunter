import { describe, expect, test } from "vitest";
import { getNextJsData } from "./getNextJsData";
import { otodomClient } from "./query";

describe("getNextJsData", () => {
  test("otodom", async () => {
    await expect(
      await getNextJsData(
        "https://www.otodom.pl/pl/oferta/szczecin-monte-cassino-rayskiego-85m2-ID4oZfo",
      ).then((d) => JSON.stringify(d)),
    ).toMatchFileSnapshot(`otodom.json`);
  });

  test("otodom graphql", async () => {
    const ads = await otodomClient.SearchAds();

    expect(ads.searchAds?.items?.length).toBeGreaterThan(0);
  });
});
