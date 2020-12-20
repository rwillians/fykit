import UserFaultHttpError from './UserFaultHttpError';

class TooManyRequestsHttpError extends UserFaultHttpError {
  /**
   * @param {Object} params
   * @param {string} params.code
   * @param {string} params.message
   * @param {string} [params.stack]
   */
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 429, code, message, stack });
  }
}

export default TooManyRequestsHttpError;
