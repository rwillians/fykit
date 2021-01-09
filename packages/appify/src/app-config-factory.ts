import { config, halt } from '@fykit/config';
import { environments } from '@fykit/commons';
import defaultsdeep from 'lodash.defaultsdeep';
import { format } from 'util';

import { GenericObject, UserlandConfig } from './types';

export default halt((userlandConfig: UserlandConfig, environment: string): GenericObject => {
  const baseConfig = config(({ env, is }) => {
    const name = env(['APPIFY_APP_NAME', 'npm_package_name'], [is.defaultTo('app')]);
    const release = env('GIT_RELEASE');
    const commit = env('GIT_COMMIT');

    const isDev = environment == environments.DEVELOPMENT;

    return {
      app: {
        name,
        version: release,
        commit,
      },
      helmet: {},
      nocache: true,
      morgan: {
        format: env('APPIFY_MORGAN_FORMAT', [is.defaultTo(':method :url :status :: :response-time ms')]),
      },
      sentry: {
        environment,
        attachStacktrace: true,
        dsn: env(['APPIFY_SENTRY_DSN', 'SENTRY_DSN']),
        tags: { release, commit },
        beforeSend: (event: GenericObject): GenericObject | null => !isDev ? event : null,
        release: format('%s@%s', name, release || 'unknown'),
      },
    };
  });

  return Object.freeze(defaultsdeep(baseConfig, userlandConfig));
});
