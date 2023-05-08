import { NextFunction, Request, Response } from "express";

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

function rescue(handler: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(handler(req, res, next));
    } catch (e) {
      next(e);
    }
  };
}

function rescueFrom(handleableError: any, handler: ErrorHandler) {
  return async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!(err instanceof handleableError)) return next(err);
    await Promise.resolve(handler(err, req, res, next));
  };
}

rescue.from = rescueFrom;

export { rescue, rescueFrom };
export default rescue;
