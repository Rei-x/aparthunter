import { describe, expect, test } from "vitest";
import { getNextJsData } from "./getNextJsData";

describe("getNextJsData", () => {
  test("otodom", async () => {
    await expect(
      await getNextJsData(
        "https://www.otodom.pl/pl/oferta/szczecin-monte-cassino-rayskiego-85m2-ID4oZfo",
      ).then((d) => JSON.stringify(d)),
    ).toMatchFileSnapshot(`otodom.json`);
  });
});
