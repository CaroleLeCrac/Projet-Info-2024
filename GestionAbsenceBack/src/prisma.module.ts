import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],  // PrismaService est bien dans providers
  exports: [PrismaService],     // PrismaService doit être exporté pour être utilisé ailleurs
})
export class PrismaModule {}