import { Module } from '@nestjs/common';
import { AdeController } from './ade.controller';
import { AdeService } from './ade.service';
import { SemesterModule } from 'src/semester/semester.module';
import { CourseMaterialModule } from 'src/course_material/course_material.module';
import { SessionTypeModule } from 'src/session_type/session_type.module';
import { SemesterService } from 'src/semester/semester.service';
import { CourseMaterialService } from 'src/course_material/course_material.service';
import { SessionTypeService } from 'src/session_type/session_type.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [AdeController],
  providers: [AdeService, SemesterService, CourseMaterialService, SessionTypeService],
  imports : [SemesterModule, CourseMaterialModule, SessionTypeModule, PrismaModule]
})
export class AdeModule {}
