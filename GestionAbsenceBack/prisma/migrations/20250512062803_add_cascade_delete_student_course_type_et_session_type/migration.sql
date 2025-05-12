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
CREATE TABLE "new_session_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course_type_name" TEXT NOT NULL,
    "course_material_id" INTEGER NOT NULL,
    CONSTRAINT "session_type_course_material_id_fkey" FOREIGN KEY ("course_material_id") REFERENCES "course_material" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_session_type" ("course_material_id", "course_type_name", "id") SELECT "course_material_id", "course_type_name", "id" FROM "session_type";
DROP TABLE "session_type";
ALTER TABLE "new_session_type" RENAME TO "session_type";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
