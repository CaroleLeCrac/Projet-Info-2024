import { Module } from '@nestjs/common';
import { CourseMaterialController } from './course_material.controller';
import { CourseMaterialService } from './course_material.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseMaterialController],
  providers: [CourseMaterialService],
})
export class CourseMaterialModule {}
