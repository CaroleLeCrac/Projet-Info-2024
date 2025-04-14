import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from 'src/student/student.module';
import { SlotModule } from 'src/slot/slot.module';
import { PresenceModule } from 'src/presence/presence.module';
import { SessionTypeModule } from 'src/session_type/session_type.module';
import { SupervisorModule } from 'src/supervisor/supervisor.module';

@Module({
  imports: [StudentModule, SlotModule, PresenceModule, SessionTypeModule, SupervisorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
