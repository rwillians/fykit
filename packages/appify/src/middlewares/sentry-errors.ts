import * as Sentry from '@sentry/node';
import { UserFaultHttpError } from '@fykit/commons';
import { Request, Response} from 'express'

export default () => {
  return (err: Error, req: Request, res: Response, next: (error?: Error) => void) => {
    if (err instanceof UserFaultHttpError) {
      return next(err)
    }

    Sentry.Handlers.errorHandler()(err, req, res, () => {
      next(err)
    })
  }
}
