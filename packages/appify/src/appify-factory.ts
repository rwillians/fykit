import debugFactory from 'debug';
import defaultsdeep from 'lodash.defaultsdeep'
import express from 'express';
import * as Sentry from '@sentry/node';

import baseConfigFactory from './base-config-factory';
import * as middlewares from './middlewares';

import {
  AppifyFactoryCallbackFn,
  AppifyBootupFnArg,
  Logger,
  RequestListener
} from './types';

const debug = debugFactory('appify:factory');

const defaultLogger: Logger = {
  error: console.error.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
};

export default function appify(cb: AppifyFactoryCallbackFn) {
  return async function bootup({
    config: userlandConfigMaybeFn = {},
    environment,
    logger = defaultLogger,
    ...props
  }: AppifyBootupFnArg): Promise<RequestListener> {
    const app = express()
    const router = express.Router()

    const resolvedBaseConfig = baseConfigFactory(environment)
    const resolvedUserlandConfig = typeof userlandConfigMaybeFn == 'function'
      ? await Promise.resolve(userlandConfigMaybeFn(environment, resolvedBaseConfig))
      : userlandConfigMaybeFn

    const config = Object.freeze(
      defaultsdeep(resolvedUserlandConfig, resolvedBaseConfig)
    )

    config.sentry.dsn
      ? Sentry.init({ ...config.sentry })
      : debug('missing sentry dsn, skipping...')

    app.use(middlewares.sentry.requests())
    app.use(middlewares.morgan(config.morgan))
    app.use(middlewares.parsers.urlencoded())
    app.use(middlewares.parsers.json())
    app.use(middlewares.helmet(config.helmet))
    app.use(middlewares.nocache(config.nocache))

    await Promise.resolve(cb({ router, config, environment, logger, ...props }))

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
