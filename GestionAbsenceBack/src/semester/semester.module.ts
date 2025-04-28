import { Module } from '@nestjs/common';
import { SemesterController } from './semester.controller';
import { SemesterService } from './semester.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SemesterController],
  providers: [SemesterService],
})
export class SemesterModule {}
