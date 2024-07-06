-- CreateEnum
CREATE TYPE "ConstructionStatus" AS ENUM ('ToRenovation', 'ReadyToUse');

-- CreateEnum
CREATE TYPE "Heating" AS ENUM ('Urban', 'Gas');

-- CreateEnum
CREATE TYPE "Market" AS ENUM ('Secondary', 'New');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('Agency', 'Private', 'Developer');

-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneNumber" (
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "PhoneNumber_pkey" PRIMARY KEY ("phoneNumber")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "saleApartmentId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OwnerType" NOT NULL,
    "url" TEXT,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("externalId")
);

-- CreateTable
CREATE TABLE "SaleApartment" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER,
    "description" TEXT NOT NULL,
    "numberOfRoomsOrPeople" INTEGER NOT NULL,
    "isRoom" BOOLEAN NOT NULL DEFAULT false,
    "area" INTEGER NOT NULL,
    "constructionStatus" "ConstructionStatus",
    "floor" INTEGER,
    "buildingFloors" INTEGER,
    "rent" INTEGER,
    "heating" "Heating",
    "market" "Market",
    "buildYear" INTEGER,
    "buildingType" TEXT,
    "windowsType" TEXT,
    "entryPhone" BOOLEAN,
    "furniture" BOOLEAN,
    "balcony" BOOLEAN,
    "fridge" BOOLEAN,
    "lift" BOOLEAN,
    "separateKitchen" BOOLEAN,
    "offerDate" TIMESTAMP(3),
    "status" "Status" NOT NULL,
    "province" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "pointId" TEXT,
    "cityName" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "SaleApartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentApartment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "numberOfRoomsOrPeople" INTEGER NOT NULL,
    "isRoom" BOOLEAN NOT NULL DEFAULT false,
    "area" INTEGER NOT NULL,
    "offerDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cityName" TEXT NOT NULL,

    CONSTRAINT "RentApartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_OwnerToPhoneNumber" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SaleApartment_url_key" ON "SaleApartment"("url");

-- CreateIndex
CREATE UNIQUE INDEX "RentApartment_url_key" ON "RentApartment"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_OwnerToPhoneNumber_AB_unique" ON "_OwnerToPhoneNumber"("A", "B");

-- CreateIndex
CREATE INDEX "_OwnerToPhoneNumber_B_index" ON "_OwnerToPhoneNumber"("B");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_saleApartmentId_fkey" FOREIGN KEY ("saleApartmentId") REFERENCES "SaleApartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleApartment" ADD CONSTRAINT "SaleApartment_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleApartment" ADD CONSTRAINT "SaleApartment_cityName_fkey" FOREIGN KEY ("cityName") REFERENCES "City"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleApartment" ADD CONSTRAINT "SaleApartment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("externalId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentApartment" ADD CONSTRAINT "RentApartment_cityName_fkey" FOREIGN KEY ("cityName") REFERENCES "City"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnerToPhoneNumber" ADD CONSTRAINT "_OwnerToPhoneNumber_A_fkey" FOREIGN KEY ("A") REFERENCES "Owner"("externalId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnerToPhoneNumber" ADD CONSTRAINT "_OwnerToPhoneNumber_B_fkey" FOREIGN KEY ("B") REFERENCES "PhoneNumber"("phoneNumber") ON DELETE CASCADE ON UPDATE CASCADE;
