import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/student.module';

@Module({
  imports: [StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
