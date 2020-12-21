import UserFaultHttpError from './UserFaultHttpError';

class ForbiddenHttpError extends UserFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 403, code, message, stack });
  }
}

export default ForbiddenHttpError;
