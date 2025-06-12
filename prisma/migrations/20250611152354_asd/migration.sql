-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_License" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "license" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "noOfUsers" INTEGER,
    "costPrice" REAL NOT NULL,
    "salesPrice" REAL,
    "discount" REAL DEFAULT 0,
    "status" TEXT NOT NULL,
    "purchaseDate" DATETIME NOT NULL,
    "soldDate" DATETIME,
    "lastDeactivated" DATETIME,
    "noOfDeactivation" INTEGER NOT NULL DEFAULT 0,
    "replacementLicense" TEXT,
    "saleId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "License_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_License" ("costPrice", "createdAt", "discount", "id", "lastDeactivated", "license", "noOfDeactivation", "noOfUsers", "purchaseDate", "replacementLicense", "saleId", "salesPrice", "soldDate", "status", "type", "updatedAt", "userId") SELECT "costPrice", "createdAt", "discount", "id", "lastDeactivated", "license", "noOfDeactivation", "noOfUsers", "purchaseDate", "replacementLicense", "saleId", "salesPrice", "soldDate", "status", "type", "updatedAt", "userId" FROM "License";
DROP TABLE "License";
ALTER TABLE "new_License" RENAME TO "License";
CREATE UNIQUE INDEX "License_license_key" ON "License"("license");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
