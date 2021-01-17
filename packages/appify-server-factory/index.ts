'use strict';

import { Argv } from 'yargs';
import debug from 'debug';
import { Debugger } from 'debug';
import env from 'sugar-env';
import path from 'path';
import relative from 'require-relative';
import { RequestListener } from 'http';
import yargs from 'yargs';

const SERVER_FACTORY_VERSION = require('../package.json').version;

const getVersion = (
  serverName: string,
  serverVersion: string | null
): string => {
  if (!serverVersion || serverVersion == '') {
    return SERVER_FACTORY_VERSION;
  }

  return `Server Factory ${SERVER_FACTORY_VERSION} / ${serverName} ${serverVersion}`;
};

const requireRelative = (file: string) => {
  return relative(path.resolve(process.cwd(), file));
};

const factory = (
  name: string,
  version: string | null,
  extendYargsFn: (builder: Argv) => Argv
) => {
  const args = yargs
    .usage('Usage: $0 [app] [options]')
    .command('$0 [app] [options]', `Serves the app with ${name}`, (builder) =>
      extendYargsFn(
        builder
          .positional('app', {
            describe: 'Relative path the your app file.',
            default: 'app.js',
          })
          .alias('d', 'debug')
          .describe('d', 'Enables appify debug info')
          .boolean('d')
      )
    )
    .help('h')
    .alias('h', 'help')
    .version(getVersion(name, version)).argv;

  const namespaces = process.env.DEBUG ? process.env.DEBUG.split(',') : [];

  if (args.debug) {
    namespaces.push('appify:*');
  }

  if (namespaces.length > 0) {
    debug.enable(namespaces.join(','));
  }

  const appFactory: (arg: {
    environment: string;
  }) => Promise<RequestListener> = requireRelative(args.app as string);

  return async (
    startServerFn: (props: {
      app: RequestListener;
      args: { [key: string]: any };
      debug: Debugger;
      requireRelative: typeof requireRelative;
      [key: string]: any;
    }) => Promise<void>
  ): Promise<void> => {
    return startServerFn({
      app: await appFactory({ environment: env.current }),
      args,
      debug: debug('appify:server'),
      requireRelative,
    });
  };
};

export default factory;
export { factory };
export { Argv } from 'yargs';
export { Debugger } from 'debug';
export { RequestListener } from 'http';
