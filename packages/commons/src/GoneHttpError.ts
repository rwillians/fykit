import UserFaultHttpError from './UserFaultHttpError';

class GoneHttpError extends UserFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 410, code, message, stack });
  }
}

export default GoneHttpError;
