/*
  Warnings:

  - Added the required column `first_name` to the `supervisor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_supervisor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "mail" TEXT NOT NULL
);
INSERT INTO "new_supervisor" ("id", "mail", "name") SELECT "id", "mail", "name" FROM "supervisor";
DROP TABLE "supervisor";
ALTER TABLE "new_supervisor" RENAME TO "supervisor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
