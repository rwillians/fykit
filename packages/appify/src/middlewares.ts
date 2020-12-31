import jsonParser from './middlewares/parser-json';
import urlencodedParser from './middlewares/parser-urlencoded';

const parsers = {
  json: jsonParser,
  urlencoded: urlencodedParser
}

import sentryErrors from './middlewares/sentry-errors';
import sentryRequests from './middlewares/sentry-requests';

const sentry = {
  errors: sentryErrors,
  requests: sentryRequests
}

export { default as helmet } from './middlewares/helmet';
export { default as morgan } from './middlewares/morgan';
export { default as nocache } from './middlewares/nocache';
export { default as normalizer } from './middlewares/normalizer';
export { default as renderer } from './middlewares/renderer';
export { default as stderr } from './middlewares/stderr';
export { default as unmatched } from './middlewares/unmatched';
export { parsers }
export { sentry }
