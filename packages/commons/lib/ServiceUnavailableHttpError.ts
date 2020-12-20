import ServerFaultHttpError from './ServerFaultHttpError';

class ServiceUnavailableHttpError extends ServerFaultHttpError {
  constructor({
    code,
    message,
    stack,
  }: {
    code: string;
    message: string;
    stack?: string;
  }) {
    super({ status: 503, code, message, stack });
  }
}

export default ServiceUnavailableHttpError;
