import { ModuleRef } from '@nestjs/core';
import { KueModule, KueService, KueTaskRegisterService } from 'nestjs-kue';
import { Module, OnModuleInit } from '@nestjs/common';
import { TaskService } from './task.service';

@Module({
  imports: [KueModule],
  providers: [TaskService],
  exports: [TaskService, KueModule],
})
export class TaskModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly taskRegister: KueTaskRegisterService,
  ) {}

  onModuleInit() {
    this.taskRegister.setModuleRef(this.moduleRef);
    this.taskRegister.register(TaskService);
  }
}
