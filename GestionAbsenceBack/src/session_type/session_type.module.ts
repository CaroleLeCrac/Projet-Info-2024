import { Module } from '@nestjs/common';
import { SessionTypeController } from './session_type.controller';
import { SessionTypeService } from './session_type.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SessionTypeController],
  providers: [SessionTypeService],
})
export class SessionTypeModule {}