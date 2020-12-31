import { HttpError, InternalServerErrorHttpError } from '@fykit/commons';
import { Request, Response } from 'express';

export default () => {
  return (err: any, _req: Request, _res: Response, next: (err?: any) => void) => {
    if (err instanceof HttpError) {
      return next(err)
    }

    return next(new InternalServerErrorHttpError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
      stack: err.stack
    }))
  }
}
