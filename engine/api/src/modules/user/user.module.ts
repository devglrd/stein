import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRessource } from '../../ressources/UserRessource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { DoneCallback, Job, Queue } from 'bull';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { TaskModule } from '../task/task.module';
import { KueService } from 'nestjs-kue';
import { TaskService } from '../task/task.service';

@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRessource],
  controllers: [UserController],
  exports: [UserService, UserRessource, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
