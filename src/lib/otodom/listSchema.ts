import * as z from "zod";

export const TypeSchema = z.enum(["AGENCY", "developer", "DEVELOPER"]);
export type Type = z.infer<typeof TypeSchema>;

export const BusinessUserDetailsTypenameSchema = z.enum([
  "AgencyListingDetails",
]);
export type BusinessUserDetailsTypename = z.infer<
  typeof BusinessUserDetailsTypenameSchema
>;

export const DevelopmentTitleSchema = z.enum(["", "Przemyska Vita"]);
export type DevelopmentTitle = z.infer<typeof DevelopmentTitleSchema>;

export const EstateSchema = z.enum(["FLAT"]);
export type Estate = z.infer<typeof EstateSchema>;

export const ImageTypenameSchema = z.enum(["AdImage"]);
export type ImageTypename = z.infer<typeof ImageTypenameSchema>;

export const CityTypenameSchema = z.enum(["City", "Province"]);
export type CityTypename = z.infer<typeof CityTypenameSchema>;

export const StreetTypenameSchema = z.enum(["Street"]);
export type StreetTypename = z.infer<typeof StreetTypenameSchema>;

export const AddressTypenameSchema = z.enum(["Address"]);
export type AddressTypename = z.infer<typeof AddressTypenameSchema>;

export const MapDetailsTypenameSchema = z.enum(["MapDetails"]);
export type MapDetailsTypename = z.infer<typeof MapDetailsTypenameSchema>;

export const TentacledTypenameSchema = z.enum(["BasicLocationObject"]);
export type TentacledTypename = z.infer<typeof TentacledTypenameSchema>;

export const ReverseGeocodingTypenameSchema = z.enum(["ReverseGeocoding"]);
export type ReverseGeocodingTypename = z.infer<
  typeof ReverseGeocodingTypenameSchema
>;

export const FluffyTypenameSchema = z.enum(["LocationDetails"]);
export type FluffyTypename = z.infer<typeof FluffyTypenameSchema>;

export const CurrencySchema = z.enum(["PLN"]);
export type Currency = z.infer<typeof CurrencySchema>;

export const PricePerSquareMeterTypenameSchema = z.enum(["Money"]);
export type PricePerSquareMeterTypename = z.infer<
  typeof PricePerSquareMeterTypenameSchema
>;

export const RoomsNumberSchema = z.enum(["FOUR", "ONE", "THREE", "TWO"]);
export type RoomsNumber = z.infer<typeof RoomsNumberSchema>;

export const TransactionSchema = z.enum(["SELL"]);
export type Transaction = z.infer<typeof TransactionSchema>;

export const PurpleTypenameSchema = z.enum(["AdvertListItem"]);
export type PurpleTypename = z.infer<typeof PurpleTypenameSchema>;

export const StickyTypenameSchema = z.enum(["LocationLink"]);
export type StickyTypename = z.infer<typeof StickyTypenameSchema>;

export const BusinessUserDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().optional(),
  imageUrl: z.union([z.null(), z.string()]),
  type: TypeSchema,
  brandingVisible: z.boolean(),
  highlightedAds: z.boolean().optional(),
  __typename: BusinessUserDetailsTypenameSchema,
});
export type BusinessUserDetails = z.infer<typeof BusinessUserDetailsSchema>;

export const ImageSchema = z.object({
  medium: z.string(),
  large: z.string(),
  __typename: ImageTypenameSchema,
});
export type Image = z.infer<typeof ImageSchema>;

export const CitySchema = z.object({
  name: z.string(),
  __typename: CityTypenameSchema,
});
export type City = z.infer<typeof CitySchema>;

export const StreetSchema = z.object({
  name: z.string(),
  number: z.string(),
  __typename: StreetTypenameSchema,
});
export type Street = z.infer<typeof StreetSchema>;

export const MapDetailsSchema = z.object({
  radius: z.number(),
  __typename: MapDetailsTypenameSchema,
});
export type MapDetails = z.infer<typeof MapDetailsSchema>;

export const LocationElementSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  __typename: TentacledTypenameSchema,
});
export type LocationElement = z.infer<typeof LocationElementSchema>;

export const PricePerSquareMeterSchema = z.object({
  value: z.number(),
  currency: CurrencySchema,
  __typename: PricePerSquareMeterTypenameSchema,
});
export type PricePerSquareMeter = z.infer<typeof PricePerSquareMeterSchema>;

export const PaginationSchema = z.object({
  totalResults: z.number(),
  itemsPerPage: z.number(),
  page: z.number(),
  totalPages: z.number(),
  __typename: z.string(),
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const TrackingSetSchema = z.object({
  cat_l1_id: z.number(),
  cat_l1_name: z.string(),
  business: z.string(),
  selected_street_id: z.string(),
  selected_district_id: z.string(),
  selected_city_id: z.string(),
  selected_subregion_id: z.string(),
  selected_region_id: z.string(),
});
export type TrackingSet = z.infer<typeof TrackingSetSchema>;

export const SearchAdsRandomInvestmentsItemSchema = z.object({
  id: z.string(),
  images: z.array(z.string()),
  price: z.string(),
  location: z.string(),
  title: z.string(),
  hidePrice: z.null(),
  businessName: z.string(),
  businessUserDetails: BusinessUserDetailsSchema,
  slug: z.string(),
  state: z.string(),
  specialOffer: z.null(),
  __typename: z.string(),
});
export type SearchAdsRandomInvestmentsItem = z.infer<
  typeof SearchAdsRandomInvestmentsItemSchema
>;

export const SearchLinksRelatedLocationsItemSchema = z.object({
  name: z.string(),
  estate: EstateSchema,
  transaction: TransactionSchema,
  location: z.string(),
  count: z.null(),
  __typename: StickyTypenameSchema,
});
export type SearchLinksRelatedLocationsItem = z.infer<
  typeof SearchLinksRelatedLocationsItemSchema
>;

export const BoundingBoxSchema = z.object({
  neLat: z.number(),
  neLng: z.number(),
  swLat: z.number(),
  swLng: z.number(),
  __typename: z.string(),
});
export type BoundingBox = z.infer<typeof BoundingBoxSchema>;

export const AddressSchema = z.object({
  street: z.union([StreetSchema, z.null()]),
  city: CitySchema,
  province: CitySchema,
  __typename: AddressTypenameSchema,
});
export type Address = z.infer<typeof AddressSchema>;

export const ReverseGeocodingSchema = z.object({
  locations: z.array(LocationElementSchema),
  __typename: ReverseGeocodingTypenameSchema,
});
export type ReverseGeocoding = z.infer<typeof ReverseGeocodingSchema>;

export const SearchAdsRandomInvestmentsSchema = z.object({
  __typename: z.string(),
  items: z.array(SearchAdsRandomInvestmentsItemSchema),
});
export type SearchAdsRandomInvestments = z.infer<
  typeof SearchAdsRandomInvestmentsSchema
>;

export const SearchLinksRelatedLocationsSchema = z.object({
  items: z.array(SearchLinksRelatedLocationsItemSchema),
  __typename: z.string(),
});
export type SearchLinksRelatedLocations = z.infer<
  typeof SearchLinksRelatedLocationsSchema
>;

export const SearchMapPinsSchema = z.object({
  __typename: z.string(),
  boundingBox: BoundingBoxSchema,
});
export type SearchMapPins = z.infer<typeof SearchMapPinsSchema>;

export const ItemLocationSchema = z.object({
  mapDetails: MapDetailsSchema,
  address: AddressSchema,
  reverseGeocoding: ReverseGeocodingSchema,
  __typename: FluffyTypenameSchema,
});
export type ItemLocation = z.infer<typeof ItemLocationSchema>;

export const SearchAdsItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  estate: EstateSchema,
  developmentId: z.number(),
  developmentTitle: DevelopmentTitleSchema,
  developmentUrl: z.string(),
  transaction: TransactionSchema,
  location: ItemLocationSchema,
  images: z.array(ImageSchema),
  isExclusiveOffer: z.boolean(),
  isPrivateOwner: z.boolean(),
  isPromoted: z.boolean(),
  agency: z.union([BusinessUserDetailsSchema, z.null()]),
  openDays: z.string(),
  totalPrice: z.union([PricePerSquareMeterSchema, z.null()]),
  rentPrice: z.union([PricePerSquareMeterSchema, z.null()]),
  priceFromPerSquareMeter: z.null(),
  pricePerSquareMeter: z.union([PricePerSquareMeterSchema, z.null()]),
  areaInSquareMeters: z.number(),
  terrainAreaInSquareMeters: z.null(),
  roomsNumber: RoomsNumberSchema,
  hidePrice: z.boolean(),
  floorNumber: z.union([z.null(), z.string()]),
  investmentState: z.null(),
  investmentUnitsAreaInSquareMeters: z.null(),
  peoplePerRoom: z.null(),
  dateCreated: z.coerce.date(),
  dateCreatedFirst: z.coerce.date(),
  investmentUnitsNumber: z.null(),
  investmentUnitsRoomsNumber: z.null(),
  investmentEstimatedDelivery: z.null(),
  pushedUpAt: z.union([z.coerce.date(), z.null()]),
  specialOffer: z.null(),
  shortDescription: z.string(),
  __typename: PurpleTypenameSchema,
  totalPossibleImages: z.number(),
});
export type SearchAdsItem = z.infer<typeof SearchAdsItemSchema>;

export const SearchAdsRandomPromotedSchema = z.object({
  __typename: z.string(),
  items: z.array(SearchAdsItemSchema),
});
export type SearchAdsRandomPromoted = z.infer<
  typeof SearchAdsRandomPromotedSchema
>;

export const SearchAdsSchema = z.object({
  __typename: z.string(),
  geometries: z.null(),
  locationsObjects: z.null(),
  recommendationLink: z.null(),
  items: z.array(SearchAdsItemSchema),
  trackingSet: TrackingSetSchema,
  pagination: PaginationSchema,
  locationString: z.string(),
});
export type SearchAds = z.infer<typeof SearchAdsSchema>;

export const WelcomeSchema = z.object({
  searchAds: SearchAdsSchema,
  searchMapPins: SearchMapPinsSchema,
  searchAdsRandomPromoted: SearchAdsRandomPromotedSchema,
  searchAdsRandomInvestments: SearchAdsRandomInvestmentsSchema,
  searchLinksRelatedLocations: SearchLinksRelatedLocationsSchema,
});
export type Welcome = z.infer<typeof WelcomeSchema>;
