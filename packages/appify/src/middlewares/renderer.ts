import { environments, HttpError, UnprocessableEntityHttpError } from '@fykit/commons';
import { Request, Response } from 'express'

const getMessage = (err: HttpError, environment: string, genericmessage: string): string => {
  if (err.status < 500) {
    return err.message
  }

  return environment !== environments.PRODUCTION
    ? err.message
    : genericmessage
}

const getStack = (err: HttpError, environment: string): string | undefined => {
  return err.status >= 500 && environment !== environments.PRODUCTION
    ? err.stack
    : undefined
}

const getDetails = (err: HttpError): Object[] | undefined => {
  return err instanceof UnprocessableEntityHttpError
    ? err.details
    : undefined;
}

export default (environment: string) => {
  return (err: HttpError, _req: Request, res: Response, _next: (err?: any) => void): void => {
    const { code, status } = err
    const stack = getStack(err, environment)
    const message = getMessage(err, environment, 'Oh no! Something went wrong on our end.')
    const details = getDetails(err)

    res
      .status(status)
      .json({ status, error: { code, message, stack, details } })
  }
}
