import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class DefaultMiddleware implements NestMiddleware {
  constructor() {}

  public async use(req: any, res: Response, next: Function) {
    return next();
  }
}
