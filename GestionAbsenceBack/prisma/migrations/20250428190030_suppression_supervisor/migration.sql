/*
  Warnings:

  - You are about to drop the `supervisor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `full_promo` on the `course_material` table. All the data in the column will be lost.
  - You are about to drop the column `attendance` on the `presence` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `semester` table. All the data in the column will be lost.
  - You are about to drop the column `nb_repetitions` on the `session_type` table. All the data in the column will be lost.
  - You are about to drop the column `num_session` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `starting_time` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor_id` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `mail` on the `student` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "supervisor";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_course_material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "course_material_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_course_material" ("id", "name", "semester_id") SELECT "id", "name", "semester_id" FROM "course_material";
DROP TABLE "course_material";
ALTER TABLE "new_course_material" RENAME TO "course_material";
CREATE TABLE "new_presence" (
    "student_id" INTEGER NOT NULL,
    "slot_id" INTEGER NOT NULL,

    PRIMARY KEY ("student_id", "slot_id"),
    CONSTRAINT "presence_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "presence_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "slot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_presence" ("slot_id", "student_id") SELECT "slot_id", "student_id" FROM "presence";
DROP TABLE "presence";
ALTER TABLE "new_presence" RENAME TO "presence";
CREATE TABLE "new_semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_semester" ("id", "name") SELECT "id", "name" FROM "semester";
DROP TABLE "semester";
ALTER TABLE "new_semester" RENAME TO "semester";
CREATE TABLE "new_session_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course_type_name" TEXT NOT NULL,
    "course_material_id" INTEGER NOT NULL,
    CONSTRAINT "session_type_course_material_id_fkey" FOREIGN KEY ("course_material_id") REFERENCES "course_material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_session_type" ("course_material_id", "course_type_name", "id") SELECT "course_material_id", "course_type_name", "id" FROM "session_type";
DROP TABLE "session_type";
ALTER TABLE "new_session_type" RENAME TO "session_type";
CREATE TABLE "new_slot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "group_id" INTEGER NOT NULL,
    "session_type_id" INTEGER NOT NULL,
    CONSTRAINT "slot_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "slot_session_type_id_fkey" FOREIGN KEY ("session_type_id") REFERENCES "session_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_slot" ("date", "group_id", "id", "session_type_id") SELECT "date", "group_id", "id", "session_type_id" FROM "slot";
DROP TABLE "slot";
ALTER TABLE "new_slot" RENAME TO "slot";
CREATE TABLE "new_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_number" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_student" ("id", "name", "student_number") SELECT "id", "name", "student_number" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
