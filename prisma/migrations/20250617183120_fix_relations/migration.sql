-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_licenseId_fkey";

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "licenseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
