/*
  Warnings:

  - Added the required column `foodbankId` to the `FoodBank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodBank" ADD COLUMN     "foodbankId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FoodBank" ADD CONSTRAINT "FoodBank_foodbankId_fkey" FOREIGN KEY ("foodbankId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
