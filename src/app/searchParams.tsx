import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
  parseAsStringEnum,
} from "nuqs/server";
export enum Sort {
  offerDate = "offerDate",
  price = "price",
}
export const filtersParsers = {
  // List your search param keys and associated parsers here:
  q: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  city: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  minPrice: parseAsInteger.withDefault(0).withOptions({ clearOnDefault: true }),
  maxPrice: parseAsInteger
    .withDefault(1_000_000)
    .withOptions({ clearOnDefault: true }),
  sortBy: parseAsStringEnum<Sort>(Object.values(Sort))
    .withDefault(Sort.offerDate)
    .withOptions({ clearOnDefault: true }),
};

export const searchParamsCache = createSearchParamsCache(filtersParsers);
