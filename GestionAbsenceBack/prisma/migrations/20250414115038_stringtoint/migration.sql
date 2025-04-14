/*
  Warnings:

  - The primary key for the `course_material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `course_material` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `semester_id` on the `course_material` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `group` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `semester_id` on the `group` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `inscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `group_id` on the `inscription` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `student_id` on the `inscription` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `presence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `slot_id` on the `presence` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `student_id` on the `presence` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `semester` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `semester` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `session_type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `course_material_id` on the `session_type` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `session_type` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `slot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `group_id` on the `slot` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `slot` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `session_type_id` on the `slot` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `supervisor_id` on the `slot` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `student` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `supervisor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `supervisor` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
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
CREATE TABLE "new_group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "group_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_group" ("id", "name", "semester_id") SELECT "id", "name", "semester_id" FROM "group";
DROP TABLE "group";
ALTER TABLE "new_group" RENAME TO "group";
CREATE TABLE "new_inscription" (
    "student_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    PRIMARY KEY ("student_id", "group_id"),
    CONSTRAINT "inscription_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "inscription_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_inscription" ("group_id", "student_id") SELECT "group_id", "student_id" FROM "inscription";
DROP TABLE "inscription";
ALTER TABLE "new_inscription" RENAME TO "inscription";
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
    "year" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_semester" ("id", "name", "year") SELECT "id", "name", "year" FROM "semester";
DROP TABLE "semester";
ALTER TABLE "new_semester" RENAME TO "semester";
CREATE TABLE "new_session_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course_type_name" TEXT NOT NULL,
    "nb_repetitions" INTEGER NOT NULL,
    "full_promo" BOOLEAN NOT NULL,
    "course_material_id" INTEGER NOT NULL,
    CONSTRAINT "session_type_course_material_id_fkey" FOREIGN KEY ("course_material_id") REFERENCES "course_material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_session_type" ("course_material_id", "course_type_name", "full_promo", "id", "nb_repetitions") SELECT "course_material_id", "course_type_name", "full_promo", "id", "nb_repetitions" FROM "session_type";
DROP TABLE "session_type";
ALTER TABLE "new_session_type" RENAME TO "session_type";
CREATE TABLE "new_slot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "starting_time" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "num_session" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "supervisor_id" INTEGER NOT NULL,
    "session_type_id" INTEGER NOT NULL,
    CONSTRAINT "slot_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "slot_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "supervisor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "slot_session_type_id_fkey" FOREIGN KEY ("session_type_id") REFERENCES "session_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_slot" ("date", "group_id", "id", "num_session", "session_type_id", "starting_time", "supervisor_id") SELECT "date", "group_id", "id", "num_session", "session_type_id", "starting_time", "supervisor_id" FROM "slot";
DROP TABLE "slot";
ALTER TABLE "new_slot" RENAME TO "slot";
CREATE TABLE "new_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "mail" TEXT NOT NULL
);
INSERT INTO "new_student" ("first_name", "id", "mail", "name") SELECT "first_name", "id", "mail", "name" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE TABLE "new_supervisor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL
);
INSERT INTO "new_supervisor" ("id", "mail", "name") SELECT "id", "mail", "name" FROM "supervisor";
DROP TABLE "supervisor";
ALTER TABLE "new_supervisor" RENAME TO "supervisor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
