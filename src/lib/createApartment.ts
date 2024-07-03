import { db } from "@/server/db";
import { type Prisma } from "@prisma/client";

export const createApartment = async (
  apartment: Prisma.SaleApartmentCreateInput,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { coordinates: _, ...apartmentToUpdate } = apartment;

  return await db.saleApartment.upsert({
    where: { url: apartment.url },
    create: apartment,
    update: apartmentToUpdate,
  });
};
