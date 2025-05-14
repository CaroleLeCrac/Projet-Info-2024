-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_course_material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "course_material_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_course_material" ("id", "name", "semester_id") SELECT "id", "name", "semester_id" FROM "course_material";
DROP TABLE "course_material";
ALTER TABLE "new_course_material" RENAME TO "course_material";
CREATE TABLE "new_group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "group_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_group" ("id", "name", "semester_id") SELECT "id", "name", "semester_id" FROM "group";
DROP TABLE "group";
ALTER TABLE "new_group" RENAME TO "group";
CREATE TABLE "new_session_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course_type_name" TEXT NOT NULL,
    "course_material_id" INTEGER NOT NULL,
    CONSTRAINT "session_type_course_material_id_fkey" FOREIGN KEY ("course_material_id") REFERENCES "course_material" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_session_type" ("course_material_id", "course_type_name", "id") SELECT "course_material_id", "course_type_name", "id" FROM "session_type";
DROP TABLE "session_type";
ALTER TABLE "new_session_type" RENAME TO "session_type";
CREATE TABLE "new_slot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "group_id" INTEGER NOT NULL,
    "session_type_id" INTEGER NOT NULL,
    CONSTRAINT "slot_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "slot_session_type_id_fkey" FOREIGN KEY ("session_type_id") REFERENCES "session_type" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_slot" ("date", "group_id", "id", "session_type_id") SELECT "date", "group_id", "id", "session_type_id" FROM "slot";
DROP TABLE "slot";
ALTER TABLE "new_slot" RENAME TO "slot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
