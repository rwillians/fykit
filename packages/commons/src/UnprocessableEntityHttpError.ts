import UserFaultHttpError from './UserFaultHttpError';

class UnprocessableEntityHttpError extends UserFaultHttpError {
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
    super({ status: 422, code, message, stack });
    this.details = details;
  }
}

export default UnprocessableEntityHttpError;
