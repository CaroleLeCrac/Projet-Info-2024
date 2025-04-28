-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_inscription" (
    "student_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    PRIMARY KEY ("student_id", "group_id"),
    CONSTRAINT "inscription_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inscription_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_inscription" ("group_id", "student_id") SELECT "group_id", "student_id" FROM "inscription";
DROP TABLE "inscription";
ALTER TABLE "new_inscription" RENAME TO "inscription";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
