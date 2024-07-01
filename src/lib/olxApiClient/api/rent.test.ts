import { describe, expect, test } from "vitest";
import { apiClient } from "./index";
import { categories } from "./constants";
describe("api test", () => {
  test("requests succeed for rent", async () => {
    const offers = await apiClient.offers.list({
      category_id: categories.ApartmentsRent,
      limit: 40,
      offset: 0,
    });

    expect(offers.data.length).toBeGreaterThan(0);
  });

  test("requests succeed for sale", async () => {
    const offers = await apiClient.offers.list({
      category_id: categories.ApartmentsSale,
      limit: 40,
      offset: 200,
    });

    expect(offers.data.length).toBeGreaterThan(0);
  });

  test("expected fields are present", async () => {
    const offers = await apiClient.offers.list({
      category_id: categories.ApartmentsSale,
      limit: 40,
      offset: 0,
    });

    const offer = offers.data[0];

    await expect(offer).toMatchFileSnapshot(`offer-${offer.id}.json`);
  });
});
