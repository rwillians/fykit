import UserFaultHttpError from './UserFaultHttpError';

class PaymentRequiredHttpError extends UserFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 402, code, message, stack });
  }
}

export default PaymentRequiredHttpError;
