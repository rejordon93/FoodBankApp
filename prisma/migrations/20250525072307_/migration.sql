/*
  Warnings:

  - You are about to drop the column `userId` on the `FoodBank` table. All the data in the column will be lost.
  - Made the column `daysOpen` on table `FoodBank` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FoodBank" DROP COLUMN "userId",
ALTER COLUMN "daysOpen" SET NOT NULL;
