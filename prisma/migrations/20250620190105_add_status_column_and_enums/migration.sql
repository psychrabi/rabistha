/*
  Warnings:

  - You are about to drop the column `subtotal` on the `Quotation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'EXPIRED', 'REJECTED');

-- AlterTable
ALTER TABLE "Quotation" DROP COLUMN "subtotal",
ADD COLUMN     "status" "QuotationStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0,
ALTER COLUMN "taxable" SET DEFAULT 0,
ALTER COLUMN "tax" SET DEFAULT 0,
ALTER COLUMN "total" SET DEFAULT 0,
ALTER COLUMN "price" SET DEFAULT 0;
