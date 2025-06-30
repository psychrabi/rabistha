/*
  Warnings:

  - You are about to drop the `WikiPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WikiPage";

-- CreateTable
CREATE TABLE "Wiki" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wiki_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wiki_slug_key" ON "Wiki"("slug");
