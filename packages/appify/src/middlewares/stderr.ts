import { HttpError } from '@fykit/commons';
import { Request, Response } from 'express';
import { Logger } from '../types';

export default (logger: Logger) => {
  return (err: any, _req: Request, _res: Response, next: (err?: any) => void) => {
    if (!(err instanceof HttpError)) {
      logger.error(err)
    }

    return next(err)
  }
}
