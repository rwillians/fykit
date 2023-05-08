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
declare function rescue(
  handler: RequestHandler
): (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare namespace rescue {
  var from: typeof rescueFrom;
}
declare function rescueFrom(
  handleableError: any,
  handler: ErrorHandler
): (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
export { rescue, rescueFrom };
export default rescue;
