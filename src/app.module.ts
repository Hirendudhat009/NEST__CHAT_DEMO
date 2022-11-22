import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CancelTaskReasonModule } from './cancel-task-reason/cancel-task-reason.module';
import { AppGateway } from './web-socket/chat.gateway';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    CancelTaskReasonModule,
    TypeOrmModule.forRoot(),
    UsersModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }

