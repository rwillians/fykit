import ServerFaultHttpError from './ServerFaultHttpError';

class InternalServerErrorHttpError extends ServerFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 500, code, message, stack });
  }
}

export default InternalServerErrorHttpError;
