import * as z from "zod";

export const DatumSchema = z.object({
  id: z.number(),
  name: z.string(),
  normalized_name: z.string(),
  county: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  zoom: z.number(),
  radius: z.number(),
  has_districts: z.boolean(),
});
export type City = z.infer<typeof DatumSchema>;

export const CitiesResponseSchema = z.object({
  data: z.array(DatumSchema),
});
export type CitiesApiResponse = z.infer<typeof CitiesResponseSchema>;
