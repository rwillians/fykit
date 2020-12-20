import UserFaultHttpError from './UserFaultHttpError';

class BadRequestHttpError extends UserFaultHttpError {
  public readonly details: Object[];

  constructor({
    code,
    message,
    stack,
    details = [],
  }: {
    code: string;
    message: string;
    stack?: string;
    details: Object[];
  }) {
    super({ status: 400, code, message, stack });
    this.details = details;
  }
}

export default BadRequestHttpError;
