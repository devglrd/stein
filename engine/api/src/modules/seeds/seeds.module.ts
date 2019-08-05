import { Module, Logger } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';
import { Profile } from '../../entity/profile.entity';
import { Connection } from 'typeorm';
import { ProgramingLanguage } from '../../entity/programing-language.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Profile, ProgramingLanguage]),
  ],
  controllers: [SeedsController],
  providers: [SeedsService, Logger],
})
export class SeedsModule {}
