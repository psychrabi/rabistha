/*
  Warnings:

  - Added the required column `paymentStatus` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ALTER COLUMN "soldDate" DROP NOT NULL;
