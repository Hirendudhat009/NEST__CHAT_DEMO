import { Module } from '@nestjs/common';
import { CancelTaskReasonController } from './cancel-task-reason.controller';
import { CancelTaskReasonService } from './cancel-task-reason.service';

@Module({
  controllers: [CancelTaskReasonController],
  providers: [CancelTaskReasonService]
})
export class CancelTaskReasonModule {}
