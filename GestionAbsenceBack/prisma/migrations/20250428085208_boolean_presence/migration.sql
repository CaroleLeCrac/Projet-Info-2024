/*
  Warnings:

  - You are about to alter the column `year` on the `semester` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to drop the column `full_promo` on the `session_type` table. All the data in the column will be lost.
  - Added the required column `full_promo` to the `course_material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendance` to the `presence` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_course_material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "full_promo" BOOLEAN NOT NULL,
    CONSTRAINT "course_material_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_course_material" ("id", "name", "semester_id") SELECT "id", "name", "semester_id" FROM "course_material";
DROP TABLE "course_material";
ALTER TABLE "new_course_material" RENAME TO "course_material";
CREATE TABLE "new_presence" (
    "student_id" INTEGER NOT NULL,
    "slot_id" INTEGER NOT NULL,
    "attendance" BOOLEAN NOT NULL,

    PRIMARY KEY ("student_id", "slot_id"),
    CONSTRAINT "presence_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "presence_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "slot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_presence" ("slot_id", "student_id") SELECT "slot_id", "student_id" FROM "presence";
DROP TABLE "presence";
ALTER TABLE "new_presence" RENAME TO "presence";
CREATE TABLE "new_semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_semester" ("id", "name", "year") SELECT "id", "name", "year" FROM "semester";
DROP TABLE "semester";
ALTER TABLE "new_semester" RENAME TO "semester";
CREATE TABLE "new_session_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course_type_name" TEXT NOT NULL,
    "nb_repetitions" INTEGER NOT NULL,
    "course_material_id" INTEGER NOT NULL,
    CONSTRAINT "session_type_course_material_id_fkey" FOREIGN KEY ("course_material_id") REFERENCES "course_material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_session_type" ("course_material_id", "course_type_name", "id", "nb_repetitions") SELECT "course_material_id", "course_type_name", "id", "nb_repetitions" FROM "session_type";
DROP TABLE "session_type";
ALTER TABLE "new_session_type" RENAME TO "session_type";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
