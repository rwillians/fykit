import { config, halt } from '@fykit/config';
import { environments } from '@fykit/commons';
import { format } from 'util';

import { GenericObject } from './types';

export default halt((environment: string): GenericObject => config(({ env, is }) => {
  const name = env(['APPIFY_APP_NAME', 'npm_package_name'], [is.defaultTo('app')]);
  const release = env(['APPIFY_APP_RELEASE', 'npm_package_version']);
  const commit = env('APPIFY_APP_COMMIT');

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
}));
