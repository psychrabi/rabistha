/*
  Warnings:

  - Added the required column `category` to the `Wiki` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wiki" ADD COLUMN     "category" TEXT NOT NULL;
