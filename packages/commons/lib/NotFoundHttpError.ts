import UserFaultHttpError from './UserFaultHttpError';

class NotFoundHttpError extends UserFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 404, code, message, stack });
  }
}

export default NotFoundHttpError;
