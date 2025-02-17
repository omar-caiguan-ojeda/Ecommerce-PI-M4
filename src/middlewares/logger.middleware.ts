import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toLocaleString(); 
    console.log(`Request time: [${now}] - Request Method/URL: ${req.method} ${req.url}`);
    next(); 
  }
}
