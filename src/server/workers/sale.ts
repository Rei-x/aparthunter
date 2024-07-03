import { env } from "@/env";
import type { Characteristic } from "@/gql/sdk.generated";
import { createApartment } from "@/lib/createApartment";
import { createJob } from "@/lib/createJob";
import { otodomClient } from "@/lib/otodom/query";
import { $Enums } from "@prisma/client";
import { z } from "zod";

export const { worker: saleWorker, queue: saleQueue } = createJob(
  "saleApartment",
  z.object({}),
  async () => {
    const ads = await otodomClient.SearchAds();

    await saleQueueSingle.addBulk(
      ads.searchAds?.items
        ?.map((ad) => {
          if (!ad?.id) {
            return;
          }

          return {
            name: "saleApartmentSingle" as const,
            data: {
              id: String(ad.id),
            },
          };
        })
        .filter((value) => value !== undefined) ?? [],
    );
  },
);

// Utility function to find multiple characteristics at once and ensure type safety
function findCharacteristics<T extends string>(
  characteristics: Characteristic[],
  keys: T[],
): { [K in T]?: string } {
  const found: Partial<{ [K in T]: string }> = {};
  keys.forEach((key) => {
    const characteristic = characteristics.find((char) => char.key === key);
    if (characteristic?.value) {
      found[key] = characteristic.value;
    }
  });
  return found;
}

const castMarketToEnum = (market: string) => {
  switch (market) {
    case "primary":
      return $Enums.Market.New;
    case "secondary":
    case "SECONDARY":
      return $Enums.Market.Secondary;
    default:
      throw new Error(`Unknown market: ${market}`);
  }
};

const castOwnerTypeToEnum = (type: string) => {
  switch (type) {
    case "agency":
      return $Enums.OwnerType.Agency;
    case "private":
      return $Enums.OwnerType.Private;
    case "developer":
      return $Enums.OwnerType.Developer;
    default:
      throw new Error(`Unknown owner type: ${type}`);
  }
};

const castConstructionTypeToEnum = (type: string) => {
  switch (type) {
    case "ready_to_use":
      return $Enums.ConstructionStatus.ReadyToUse;
    case "to_renovation":
      return $Enums.ConstructionStatus.ToRenovation;
  }
};

export const { worker: saleWorkerSingle, queue: saleQueueSingle } = createJob(
  "saleApartmentSingle",
  z.object({
    id: z.string(),
  }),
  async (job) => {
    const ad = await otodomClient.Advert({
      id: parseInt(job.data.id),
    });

    const advert = ad.advert;
    await job.log(JSON.stringify(advert, null, 2));
    if (
      !advert?.id ||
      !advert.url ||
      !advert.title ||
      !advert.description ||
      !advert.characteristics
    ) {
      throw new Error(
        JSON.stringify(
          {
            "advert.id": advert?.id ? null : "missing",
            "advert.url": advert?.url ? null : "missing",
            "advert.title": advert?.title ? null : "missing",
            "advert.description": advert?.description ? null : "missing",
            "advert.characteristics": advert?.characteristics
              ? null
              : "missing",
          },
          null,
          2,
        ),
      );
    }

    const characteristics = findCharacteristics(
      advert.characteristics.filter((c) => c !== null),
      ["price", "rooms_num", "m", "market", "building_type", "rent"],
    );

    if (!characteristics.m || !advert.locationDetails?.address?.city?.name) {
      throw new Error(
        JSON.stringify(
          {
            "characteristics.m": characteristics.m ? null : "missing",
            "advert.locationDetails.address.city.name": advert.locationDetails
              ?.address?.city?.name
              ? null
              : "missing",
          },
          null,
          2,
        ),
      );
    }

    let point = null;

    if (
      advert.locationDetails?.coordinates?.latitude &&
      advert.locationDetails?.coordinates?.longitude
    ) {
      point = {
        latitude: advert.locationDetails.coordinates.latitude,
        longitude: advert.locationDetails.coordinates.longitude,
      };
    }

    const categoryId = advert.category?.id?.toString();

    const ignoredCategoriesIDs = ["102", "402", "602", "401", "502", "501"];

    if (ignoredCategoriesIDs.includes(categoryId ?? "")) {
      return {
        message: `Advert is in ignored category: ${categoryId}`,
      };
    }

    if (
      // Mieszkania
      categoryId !== "101" &&
      // Domy
      categoryId !== "201"
    ) {
      throw new Error(
        `Advert is not a sale apartment, but a ${advert.category?.name?.at(0)?.value ?? ""}:{${advert.category?.id}}`,
      );
    }

    return createApartment({
      externalId: advert.id.toString(),
      title: advert.title,
      url: advert.url,
      offerDate: advert.createdAt ? new Date(advert.createdAt) : null,
      rent: characteristics.rent ? parseInt(characteristics.rent) : null,
      owner: {
        connectOrCreate: {
          create: {
            name: advert.owner?.name ?? "Unknown",
            externalId: advert.owner?.id?.toString() ?? "Unknown",
            type: castOwnerTypeToEnum(advert.owner?.type ?? "Unknown"),
            phoneNumbers: {
              connectOrCreate: advert.owner?.phones
                ?.filter((phone) => typeof phone === "string")
                .map((phone) => ({
                  create: {
                    phoneNumber: phone,
                  },
                  where: {
                    phoneNumber: phone,
                  },
                })),
            },
          },
          where: {
            externalId: advert.owner?.id?.toString(),
          },
        },
      },
      description: advert.description,
      price: characteristics.price
        ? parseInt(characteristics.price)
        : undefined,
      numberOfRoomsOrPeople:
        characteristics.rooms_num === "more"
          ? 10
          : parseInt(characteristics.rooms_num ?? "0"),
      area: parseInt(characteristics.m),
      market: characteristics.market
        ? castMarketToEnum(characteristics.market)
        : undefined,
      status: $Enums.Status.Active,
      buildingType: characteristics.building_type,
      location: `${advert.locationDetails.address.street?.name ?? ""}${advert.locationDetails.address.street?.number ? ` ${advert.locationDetails.address.street?.number}` : ""}`,
      City: {
        connectOrCreate: {
          create: {
            name: advert.locationDetails?.address?.city?.name,
          },
          where: {
            name: advert.locationDetails?.address?.city?.name,
          },
        },
      },
      Images: {
        createMany: {
          data:
            advert.images
              ?.map((image) => image?.large)
              ?.filter((image) => typeof image === "string")
              .map((image) => ({
                url: image,
              })) ?? [],
        },
      },

      coordinates: point
        ? {
            create: point,
          }
        : undefined,
    });
  },
);
