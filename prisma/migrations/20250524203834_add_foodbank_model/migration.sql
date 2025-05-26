/*
  Warnings:

  - You are about to drop the column `foodBank` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `pickupTime` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `category` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "foodBank",
DROP COLUMN "item",
DROP COLUMN "notes",
DROP COLUMN "pickupTime",
DROP COLUMN "status",
DROP COLUMN "unit",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
