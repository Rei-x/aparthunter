import { z } from "zod";

import { fetchData } from "../utils/fetchData";
import { CitiesResponseSchema } from "./cities/schema";
import { categories } from "./constants";
import { OlxApiResponseSchema } from "./schema";

const baseApi = "https://www.olx.pl/api/v1";

const apiUrl = "https://www.olx.pl/api/v1/offers";

const SearchParams = z
  .object({
    offset: z.number(),
    limit: z.number().min(0).max(50),
    category_id: z.number(),
    query: z.string().optional(),
    sort_by: z.literal("created_at:desc").optional(),
    "filter_float_price:to": z.number().optional(),
    "filter_float_price:from": z.number().optional(),
    "filter_float_m:from": z.number().optional(),
    "filter_float_m:to": z.number().optional(),
    rooms: z.array(z.enum(["one", "two", "three"])).optional(),
    "filter_enum_rooms[0]": z.enum(["one", "two", "three"]).optional(),
    "filter_enum_rooms[1]": z.enum(["one", "two", "three"]).optional(),
    "filter_enum_rooms[2]": z.enum(["one", "two", "three"]).optional(),
    "filter_enum_roomsize[0]": z.enum(["one", "two", "three"]).optional(),
    "filter_enum_roomsize[1]": z.enum(["one", "two", "three"]).optional(),
    "filter_enum_roomsize[2]": z.enum(["one", "two", "three"]).optional(),
  })
  .transform((data) => {
    if (data.category_id === categories.RoomsRent) {
      data.rooms?.forEach((room, i) => {
        data[`filter_enum_roomsize[${i.toString() as "0"}]`] = room;
      });

      delete data.rooms;

      return data;
    }

    if (data.category_id === categories.ApartmentsRent) {
      data.rooms?.forEach((room, i) => {
        data[`filter_enum_rooms[${i.toString() as "0"}]`] = room;
      });

      delete data.rooms;

      return data;
    }

    return data;
  });

// example path: "data.0.id"
const getValueFromZodPath = (path: string, data: Record<string, unknown>) => {
  const pathParts = path.split(".");

  let value = data;

  for (const part of pathParts) {
    // @ts-expect-error we know that value is an object
    value = value[part];
  }

  return value;
};

export const apiClient = {
  offers: {
    list: async (options: z.infer<typeof SearchParams>) => {
      const optionsToString = Object.fromEntries(
        Object.entries(options).map(([key, value]) => [key, value.toString()]),
      );

      const urlSearchParams = new URLSearchParams(optionsToString);

      const url = `${apiUrl}/?${urlSearchParams.toString()}`;

      const res = await fetchData(url);

      const offers = OlxApiResponseSchema.safeParse(JSON.parse(res));

      if (!offers.success) {
        console.error(
          JSON.stringify(
            offers.error.errors.map((e) => {
              const value = getValueFromZodPath(
                e.path.join("."),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                JSON.parse(res),
              );
              // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
              return e.path.join(".") + ": " + e.message + `. Got: ${value}`;
            }),
            null,
            2,
          ),
        );
      }

      return offers.success
        ? offers.data
        : {
            data: [],
          };
    },
  },
  cities: {
    list: async (
      regionId: number,
      options?: {
        limit?: number;
      },
    ) => {
      const url = `${baseApi}/geo-encoder/regions/${regionId}/cities/?limit=${
        options?.limit ?? 300
      }`;

      const res = await fetchData(url);

      const parsedCities = CitiesResponseSchema.parse(JSON.parse(res));

      return parsedCities;
    },
  },
};
