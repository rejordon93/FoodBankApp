/*
  Warnings:

  - Added the required column `userId` to the `FoodBank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodBank" ADD COLUMN     "userId" INTEGER NOT NULL;
