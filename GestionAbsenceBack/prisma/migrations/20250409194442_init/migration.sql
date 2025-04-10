-- CreateTable
CREATE TABLE "supervisor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "mail" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "inscription" (
    "student_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    PRIMARY KEY ("student_id", "group_id"),
    CONSTRAINT "inscription_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "inscription_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "group_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "course_material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "course_material_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "session_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course_type_name" TEXT NOT NULL,
    "nb_repetitions" INTEGER NOT NULL,
    "full_promo" BOOLEAN NOT NULL,
    "course_material_id" INTEGER NOT NULL,
    CONSTRAINT "session_type_course_material_id_fkey" FOREIGN KEY ("course_material_id") REFERENCES "course_material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "presence" (
    "student_id" INTEGER NOT NULL,
    "slot_id" INTEGER NOT NULL,

    PRIMARY KEY ("student_id", "slot_id"),
    CONSTRAINT "presence_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "presence_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "slot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "slot" (
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
