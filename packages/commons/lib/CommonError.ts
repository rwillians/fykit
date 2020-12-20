abstract class CommonError extends Error {
  constructor(message: string, stack?: string) {
    super(message);
    if (stack) this.stack = stack;
    this.name = this.constructor.name;
  }
}

export default CommonError;
