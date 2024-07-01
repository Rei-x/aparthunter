import { fetchData } from "./fetchData";
import { describe, expect, test } from "vitest";

describe("Fetchdata", () => {
  test("from OLX", async () => {
    const data = await fetchData(
      "https://www.olx.pl/api/v1/offers/?query=iphone%208",
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataObject = JSON.parse(data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(Array.isArray(dataObject.data)).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(dataObject.data.length > 0).toBe(true);
  });
});
