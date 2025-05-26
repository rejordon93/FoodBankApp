/*
  Warnings:

  - You are about to drop the column `name` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `item` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "name",
ADD COLUMN     "item" TEXT NOT NULL;
