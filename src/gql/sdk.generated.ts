/* eslint-disable */
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Int64: { input: any; output: any; }
};

export type AdCategory = {
  __typename?: 'AdCategory';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Array<Maybe<LocalizedName>>>;
};

export type AdItem = {
  __typename?: 'AdItem';
  agency?: Maybe<AgencyListingDetails>;
  areaInSquareMeters?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateCreatedFirst?: Maybe<Scalars['String']['output']>;
  developmentId?: Maybe<Scalars['ID']['output']>;
  developmentTitle?: Maybe<Scalars['String']['output']>;
  developmentUrl?: Maybe<Scalars['String']['output']>;
  estate?: Maybe<Scalars['String']['output']>;
  floorNumber?: Maybe<Scalars['Int']['output']>;
  hidePrice?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  images?: Maybe<Array<Maybe<Image>>>;
  isExclusiveOffer?: Maybe<Scalars['Boolean']['output']>;
  isPrivateOwner?: Maybe<Scalars['Boolean']['output']>;
  isPromoted?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<LocationDetails>;
  openDays?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  pricePerSquareMeter?: Maybe<Money>;
  pushedUpAt?: Maybe<Scalars['String']['output']>;
  rentPrice?: Maybe<Money>;
  roomsNumber?: Maybe<Scalars['Int']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  totalPrice?: Maybe<Money>;
  transaction?: Maybe<Scalars['String']['output']>;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<City>;
  county?: Maybe<County>;
  province?: Maybe<Province>;
  street?: Maybe<Street>;
};

export type Advert = {
  __typename?: 'Advert';
  adCategory?: Maybe<AdvertCategory>;
  additionalInformation?: Maybe<Array<Maybe<Information>>>;
  advertType?: Maybe<Scalars['String']['output']>;
  advertiserType?: Maybe<Scalars['String']['output']>;
  agency?: Maybe<AdvertAgency>;
  breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
  category?: Maybe<AdCategory>;
  characteristics?: Maybe<Array<Maybe<Characteristic>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  developmentId?: Maybe<Scalars['ID']['output']>;
  developmentTitle?: Maybe<Scalars['String']['output']>;
  developmentUrl?: Maybe<Scalars['String']['output']>;
  exclusiveOffer?: Maybe<Scalars['Boolean']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  featuresByCategory?: Maybe<Array<Maybe<FeatureCategory>>>;
  id?: Maybe<Scalars['ID']['output']>;
  images?: Maybe<Array<Maybe<Image>>>;
  links?: Maybe<AdvertLinks>;
  location?: Maybe<AdvertLocation>;
  locationDetails?: Maybe<LocationDetails>;
  market?: Maybe<Scalars['String']['output']>;
  modifiedAt?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<LegacyAdvertOwner>;
  publicId?: Maybe<Scalars['String']['output']>;
  referenceId?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<AdvertSeo>;
  slug?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topInformation?: Maybe<Array<Maybe<Information>>>;
  url?: Maybe<Scalars['String']['output']>;
  userAdverts?: Maybe<Array<Maybe<UserAdvert>>>;
};

export type AdvertAgency = {
  __typename?: 'AdvertAgency';
  address?: Maybe<Scalars['String']['output']>;
  brandingVisible?: Maybe<Scalars['Boolean']['output']>;
  enabledFeatures?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  leaderYear?: Maybe<Scalars['String']['output']>;
  licenseNumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phones?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type AdvertCategory = {
  __typename?: 'AdvertCategory';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type AdvertCoordinates = {
  __typename?: 'AdvertCoordinates';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type AdvertLinks = {
  __typename?: 'AdvertLinks';
  localPlanUrl?: Maybe<Scalars['String']['output']>;
  videoUrl?: Maybe<Scalars['String']['output']>;
  view3dUrl?: Maybe<Scalars['String']['output']>;
  walkaroundUrl?: Maybe<Scalars['String']['output']>;
};

export type AdvertLocation = {
  __typename?: 'AdvertLocation';
  address?: Maybe<Address>;
  coordinates?: Maybe<AdvertCoordinates>;
};

export type AdvertResult = Advert;

export type AdvertSeo = {
  __typename?: 'AdvertSeo';
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type AgencyListingDetails = {
  __typename?: 'AgencyListingDetails';
  brandingVisible?: Maybe<Scalars['Boolean']['output']>;
  highlightedAds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Breadcrumb = {
  __typename?: 'Breadcrumb';
  label?: Maybe<Scalars['String']['output']>;
  locative?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Characteristic = {
  __typename?: 'Characteristic';
  currency?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  localizedValue?: Maybe<Scalars['String']['output']>;
  suffix?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type City = {
  __typename?: 'City';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type County = {
  __typename?: 'County';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type FeatureCategory = {
  __typename?: 'FeatureCategory';
  label?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type FoundAds = {
  __typename?: 'FoundAds';
  items?: Maybe<Array<Maybe<AdItem>>>;
  locationString?: Maybe<Scalars['String']['output']>;
};

export type Image = {
  __typename?: 'Image';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type Information = {
  __typename?: 'Information';
  label?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export enum Language {
  De = 'DE',
  En = 'EN',
  Pl = 'PL'
}

export type LegacyAdvertOwner = {
  __typename?: 'LegacyAdvertOwner';
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phones?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LocalizedName = {
  __typename?: 'LocalizedName';
  locale?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  __typename?: 'Location';
  fullName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type LocationDetails = {
  __typename?: 'LocationDetails';
  address?: Maybe<Address>;
  coordinates?: Maybe<Coordinates>;
  mapDetails?: Maybe<MapDetails>;
  reverseGeocoding?: Maybe<ReverseGeocoding>;
};

export type MapDetails = {
  __typename?: 'MapDetails';
  radius?: Maybe<Scalars['Float']['output']>;
  zoom?: Maybe<Scalars['Int']['output']>;
};

export type Money = {
  __typename?: 'Money';
  currency?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type PageInput = {
  current?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Province = {
  __typename?: 'Province';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  advert?: Maybe<AdvertResult>;
  searchAds?: Maybe<SearchResult>;
};


export type QueryAdvertArgs = {
  id: Scalars['Int64']['input'];
};


export type QuerySearchAdsArgs = {
  lang?: InputMaybe<Language>;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<SortInput>;
};

export type ReverseGeocoding = {
  __typename?: 'ReverseGeocoding';
  locations?: Maybe<Array<Maybe<Location>>>;
};

export type SearchResult = FoundAds;

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortInput = {
  direction?: InputMaybe<SortDirection>;
};

export type Street = {
  __typename?: 'Street';
  name?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
};

export type UserAdvert = {
  __typename?: 'UserAdvert';
  adId?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  netArea?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<UserAdvertPrice>;
  pricePerM?: Maybe<Scalars['Float']['output']>;
  roomsNum?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type UserAdvertPrice = {
  __typename?: 'UserAdvertPrice';
  unit?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type AdvertQueryVariables = Exact<{
  id: Scalars['Int64']['input'];
}>;


export type AdvertQuery = { __typename?: 'Query', advert?: { __typename?: 'Advert', id?: string | null, externalId?: string | null, features?: Array<string | null> | null, referenceId?: string | null, title?: string | null, url?: string | null, source?: string | null, createdAt?: string | null, modifiedAt?: string | null, description?: string | null, market?: string | null, seo?: { __typename?: 'AdvertSeo', title?: string | null, description?: string | null } | null, images?: Array<{ __typename?: 'Image', thumbnail?: string | null, small?: string | null, medium?: string | null, large?: string | null } | null> | null, featuresByCategory?: Array<{ __typename?: 'FeatureCategory', label?: string | null, values?: Array<string | null> | null } | null> | null, topInformation?: Array<{ __typename?: 'Information', label?: string | null, values?: Array<string | null> | null, unit?: string | null } | null> | null, category?: { __typename?: 'AdCategory', id?: string | null, name?: Array<{ __typename?: 'LocalizedName', locale?: string | null, value?: string | null } | null> | null } | null, characteristics?: Array<{ __typename?: 'Characteristic', key?: string | null, value?: string | null, label?: string | null, localizedValue?: string | null, currency?: string | null, suffix?: string | null } | null> | null, additionalInformation?: Array<{ __typename?: 'Information', label?: string | null, values?: Array<string | null> | null, unit?: string | null } | null> | null, owner?: { __typename?: 'LegacyAdvertOwner', id?: string | null, name?: string | null, type?: string | null, phones?: Array<string | null> | null, imageUrl?: string | null } | null, locationDetails?: { __typename?: 'LocationDetails', address?: { __typename?: 'Address', street?: { __typename?: 'Street', name?: string | null, number?: string | null } | null, city?: { __typename?: 'City', id?: string | null, code?: string | null, name?: string | null } | null } | null, coordinates?: { __typename?: 'Coordinates', latitude?: number | null, longitude?: number | null } | null } | null } | null };

export type SearchAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchAdsQuery = { __typename?: 'Query', searchAds?: { __typename?: 'FoundAds', items?: Array<{ __typename?: 'AdItem', id?: string | null } | null> | null } | null };


export const AdvertDocument = gql`
    query Advert($id: Int64!) {
  advert(id: $id) {
    ... on Advert {
      id
      externalId
      features
      seo {
        title
        description
      }
      images {
        thumbnail
        small
        medium
        large
      }
      featuresByCategory {
        label
        values
      }
      referenceId
      title
      topInformation {
        label
        values
        unit
      }
      category {
        id
        name {
          locale
          value
        }
      }
      url
      source
      createdAt
      modifiedAt
      description
      market
      characteristics {
        key
        value
        label
        localizedValue
        currency
        suffix
      }
      additionalInformation {
        label
        values
        unit
      }
      owner {
        id
        name
        type
        phones
        imageUrl
      }
      locationDetails {
        address {
          street {
            name
            number
          }
          city {
            id
            code
            name
          }
        }
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
}
    `;
export const SearchAdsDocument = gql`
    query SearchAds {
  searchAds(lang: PL, page: {current: 1, limit: 40}, sort: {direction: DESC}) {
    ... on FoundAds {
      items {
        id
      }
    }
  }
}
    `;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    Advert(variables: AdvertQueryVariables, options?: C): Promise<AdvertQuery> {
      return requester<AdvertQuery, AdvertQueryVariables>(AdvertDocument, variables, options) as Promise<AdvertQuery>;
    },
    SearchAds(variables?: SearchAdsQueryVariables, options?: C): Promise<SearchAdsQuery> {
      return requester<SearchAdsQuery, SearchAdsQueryVariables>(SearchAdsDocument, variables, options) as Promise<SearchAdsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;