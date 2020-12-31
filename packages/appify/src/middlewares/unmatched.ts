import { NotFoundHttpError } from '@fykit/commons';
import { Request, Response } from 'express'

export default () => {
  return (_req: Request, _res: Response, next: (err?: any) => void) => next(new NotFoundHttpError({
    code: 'RESOURCE_NOT_FOUND',
    message: 'It seems the requested resource does not exist.'
  }))
}
