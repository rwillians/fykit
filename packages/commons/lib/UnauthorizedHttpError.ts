import UserFaultHttpError from './UserFaultHttpError';

class UnauthorizedHttpError extends UserFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 401, code, message, stack });
  }
}

export default UnauthorizedHttpError;
