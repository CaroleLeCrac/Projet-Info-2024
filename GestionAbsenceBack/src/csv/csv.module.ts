import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma.module";
import { StudentService } from "src/student/student.service";
import { StudentModule } from "src/student/student.module";
import { CsvService } from "./csv.service";
import { CsvController } from "./csv.controller";

@Module({
    providers : [CsvService,StudentService],
    controllers : [CsvController],
    imports : [PrismaModule, StudentModule]
})

export class CsvModule{}