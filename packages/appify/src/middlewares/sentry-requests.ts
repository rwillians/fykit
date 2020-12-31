import * as Sentry from '@sentry/node';
import { Request, Response } from 'express'

export default () => {
  return (req: Request, res: Response, next: (err?: any) => void) => {
    return Sentry.Handlers.requestHandler()(req, res, next)
  }
}
