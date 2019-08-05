import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { Response, Request } from 'express';
import { ApiUseTags } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';

@ApiUseTags('seeds')
@Controller('seeds')
export class SeedsController {
  constructor(
    private seedsService: SeedsService,
    private configService: ConfigService,
  ) {}

  @Get()
  async seeds(@Res() res: Response, @Req() req: Request) {
    const { token } = req.query;
    if (token !== this.configService.get('DB_TOKEN')) {
      throw new UnauthorizedException('Wrong Token combination!');
    }
    this.seedsService.seed();
    return res.send({
      message: 'Database Seeding',
    });
  }
}
