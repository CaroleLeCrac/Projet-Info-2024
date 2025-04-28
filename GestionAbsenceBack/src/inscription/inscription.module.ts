import { Module } from '@nestjs/common';
import { InscritpionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InscritpionController],
  providers: [InscriptionService],
})
export class InscriptionModule { }