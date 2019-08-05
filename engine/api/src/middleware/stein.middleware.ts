import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SteinMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    next();
  }
}
