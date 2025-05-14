import { Module } from '@nestjs/common';
import { AdeController } from './ade.controller';
import { AdeService } from './ade.service';

@Module({
  controllers: [AdeController],
  providers: [AdeService]
})
export class AdeModule {}
