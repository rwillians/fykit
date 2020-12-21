import UserFaultHttpError from './UserFaultHttpError';

class ConflictHttpError extends UserFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 409, code, message, stack });
  }
}

export default ConflictHttpError;
