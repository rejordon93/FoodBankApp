-- CreateTable
CREATE TABLE "FoodBank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "description" TEXT,
    "timeOpen" TIMESTAMP(3) NOT NULL,
    "timeClose" TIMESTAMP(3),
    "daysOpen" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "FoodBank_pkey" PRIMARY KEY ("id")
);
