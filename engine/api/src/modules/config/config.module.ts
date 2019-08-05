import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { DoneCallback, Job } from 'bull';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService('.env'),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
