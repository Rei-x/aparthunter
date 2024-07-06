import { db } from "@/server/db";
import { AddJob } from "./_components/add-job";
import Image from "next/image";
import { format } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { searchParamsCache, Sort } from "./searchParams";
import { Filters } from "./_components/filters";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const {
    q: query,
    minPrice,
    maxPrice,
    city,
    sortBy,
  } = searchParamsCache.parse(searchParams);

  const aparts = await db.saleApartment.findMany({
    take: 40,
    include: {
      owner: {
        include: {
          phoneNumbers: true,
        },
      },
      Images: true,
    },
    orderBy: [
      {
        _relevance: {
          sort: "desc",
          fields: ["title", "description"],
          search: query.split(" ").join(" | "),
        },
      },
      {
        [sortBy]:
          sortBy === Sort.offerDate
            ? {
                sort: "desc",
                nulls: "last",
              }
            : "asc",
      },
    ],
    where: {
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
      cityName: city
        ? {
            equals: city,
            mode: "insensitive",
          }
        : undefined,
    },
  });

  return (
    <main className="container mt-8">
      <h1 className="text-4xl font-bold">Aparthunter</h1>
      <div className="mt-2">
        <AddJob />
      </div>
      <div className="my-8">
        <Filters />
      </div>
      <div className="flex flex-col gap-2">
        {aparts.map((apart) => (
          <div
            key={apart.id}
            className="flex items-stretch overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="relative">
              <Carousel className="mx-8 ml-16 h-96 w-[500px]">
                <CarouselContent>
                  {apart.Images.map((image) => (
                    <CarouselItem className="flex h-full" key={image.url}>
                      <Image
                        src={image.url}
                        alt={apart.title}
                        width={1000}
                        height={1000}
                        className="h-96"
                        style={{
                          objectFit: "cover",
                          width: "500px",
                        }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              <div className="absolute bottom-4 left-4 rounded bg-white bg-opacity-75 px-2 py-1">
                <span className="text-sm text-gray-800">1 / 9</span>
              </div>
            </div>
            <div className="flex shrink-0 flex-col p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {apart.price?.toLocaleString("pl")} zł
                  </h2>
                  <p className="mt-2 text-gray-600">{apart.title}</p>
                  <p className="text-gray-500">
                    {[apart.location, apart.cityName]
                      .filter((x) => x)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-700">
                  {[
                    apart.numberOfRoomsOrPeople > 0
                      ? `${apart.numberOfRoomsOrPeople.toString()} pokoje`
                      : null,
                    apart.area ? `${apart.area.toString()} m²` : null,
                    apart.price ? `${apart.price.toString()} zł` : null,
                    apart.market ? apart.market : null,
                    apart.floor ? `${apart.floor.toString()} piętro` : null,
                    apart.buildingType ? apart.buildingType : null,
                  ]
                    .filter((x) => x)
                    .join(" · ")}
                </p>
                <a
                  href={apart.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Zobacz ogłoszenie
                </a>
              </div>
              <div className="mt-auto">
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {apart.owner.name}
                </h3>

                <p className="text-gray-600">{apart.owner.type}</p>
                <p className="text-gray-500">
                  {apart.owner.phoneNumbers
                    .map((phone) => phone.phoneNumber)
                    .join(", ")}
                </p>
                {apart.offerDate ? (
                  <p className="mt-4 text-sm text-gray-500">
                    {format(new Date(apart.offerDate), "dd.MM.yyyy")}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
