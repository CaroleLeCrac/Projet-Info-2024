-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_presence" (
    "student_id" INTEGER NOT NULL,
    "slot_id" INTEGER NOT NULL,

    PRIMARY KEY ("student_id", "slot_id"),
    CONSTRAINT "presence_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "presence_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "slot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_presence" ("slot_id", "student_id") SELECT "slot_id", "student_id" FROM "presence";
DROP TABLE "presence";
ALTER TABLE "new_presence" RENAME TO "presence";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
