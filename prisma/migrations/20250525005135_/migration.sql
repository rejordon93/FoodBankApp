/*
  Warnings:

  - You are about to drop the column `donorId` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `foodbankId` on the `FoodBank` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FoodBank` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_donorId_fkey";

-- DropForeignKey
ALTER TABLE "FoodBank" DROP CONSTRAINT "FoodBank_foodbankId_fkey";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "donorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FoodBank" DROP COLUMN "foodbankId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FoodBank" ADD CONSTRAINT "FoodBank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
