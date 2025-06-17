/*
  Warnings:

  - You are about to drop the column `discount` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `salesPrice` on the `License` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "License" DROP COLUMN "discount",
DROP COLUMN "salesPrice";

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "salesPrice" DOUBLE PRECISION;
