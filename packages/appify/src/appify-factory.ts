import express from 'express';
import debugFactory from 'debug';
import * as Sentry from '@sentry/node';

import appConfigFactory from './app-config-factory';
import * as middlewares from './middlewares';

import {
  AppifyFactoryFn,
  AppifyFactoryFnArg,
  Logger,
  RequestListener
} from './types';

const debug = debugFactory('appify:factory');

const defaultLogger: Logger = {
  error: console.error.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
};

export default function appify(fn: AppifyFactoryFn) {
  return async function factory({
    config: userlandConfig = {},
    environment,
    logger = defaultLogger,
    ...props
  }: AppifyFactoryFnArg): Promise<RequestListener> {
    const app = express()
    const router = express.Router()
    const config = appConfigFactory(userlandConfig, environment)

    config.sentry.dsn
      ? Sentry.init({ ...config.sentry })
      : debug('missing sentry dsn, skipping...')

    app.use(middlewares.sentry.requests())
    app.use(middlewares.morgan(config.morgan))
    app.use(middlewares.parsers.urlencoded())
    app.use(middlewares.parsers.json())
    app.use(middlewares.helmet(config.helmet))
    app.use(middlewares.nocache(config.nocache))

    await Promise.resolve(fn({ router, config: userlandConfig, environment, logger, ...props }))

    app.use(router)

    app.get('/ping', (_req, res) => {
      res
        .type('txt')
        .end('pong!')
    })

    app.use('*', middlewares.unmatched())
    app.use(middlewares.sentry.errors())
    app.use(middlewares.stderr(logger))
    app.use(middlewares.normalizer())
    app.use(middlewares.renderer(environment))

    return app
  };
};
