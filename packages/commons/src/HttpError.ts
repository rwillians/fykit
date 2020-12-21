import InfrastructureError from './InfrastructureError';

class HttpError extends InfrastructureError {
  public readonly status: number;
  public readonly code: string;

  constructor({
    status,
    code,
    message,
    stack,
  }: {
    status: number;
    code: string;
    message: string;
    stack?: string;
  }) {
    super(message, stack);
    this.status = status;
    this.code = code;
  }
}

export default HttpError;
