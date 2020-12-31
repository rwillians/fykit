import nocache from 'nocache';
import { IncomingMessage, ServerResponse } from 'http';

export default (isEnabled: boolean) => {
  if (isEnabled) {
    return nocache();
  }

  return (_req: IncomingMessage, _res: ServerResponse, next: () => void) => {
    next();
  };
};
