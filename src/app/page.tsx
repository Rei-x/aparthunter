import { db } from "@/server/db";
import { AddJob } from "./_components/add-job";
import Image from "next/image";
import { Scrappers } from "./_components/scrappers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default async function Home() {
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
    orderBy: {
      offerDate: {
        sort: "desc",
        nulls: "last",
      },
    },
  });

  return (
    <main className="container mt-8">
      <h1 className="text-4xl font-bold">Apartments</h1>
      <div className="mt-2">
        <AddJob />
      </div>
      <Scrappers />
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
                    <CarouselItem key={image.url}>
                      <Card className="my-auto border-none">
                        <CardContent className="py-1">
                          <Image
                            src={image.url}
                            alt={apart.title}
                            width={400}
                            height={400}
                            style={{
                              height: "350px",
                              width: "400px",
                              objectFit: "contain",
                            }}
                          />
                        </CardContent>
                      </Card>
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
                    {apart.price} zł
                  </h2>
                  <p className="mt-2 text-gray-600">{apart.title}</p>
                  <p className="text-gray-500">
                    {[apart.location, apart.cityName]
                      .filter((x) => x)
                      .join(", ")}
                  </p>
                </div>
                <button className="rounded-full p-2 text-gray-500 transition hover:text-gray-800">
                  {/* <HeartIcon className="h-6 w-6" /> */}
                </button>
              </div>
              <div className="mt-4">
                <p className="text-gray-700">
                  {[
                    apart.numberOfRoomsOrPeople > 0
                      ? `${apart.numberOfRoomsOrPeople} pokoje`
                      : null,
                    apart.area ? `${apart.area} m²` : null,
                    apart.price ? `${apart.price} zł` : null,
                    apart.market ? apart.market : null,
                    apart.floor ? `${apart.floor} piętro` : null,
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
