import UserFaultHttpError from './UserFaultHttpError';

class LockedHttpError extends UserFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 423, code, message, stack });
  }
}

export default LockedHttpError;
