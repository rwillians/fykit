#!/usr/bin/env node
import http from 'http';
import createServer from '@fykit/appify-server-factory';
import { Debugger } from '@fykit/appify-server-factory';

const VERSION = require('../package.json').version;

const serve = createServer('Native HTTP Server', VERSION, (builder) =>
  builder
    .alias('i', 'ip')
    .describe('i', 'The host IP to which the server will be binded.')
    .default('i', '0.0.0.0')
    .alias('p', 'port')
    .describe('p', 'The host port to which the server will be binded.')
    .default('p', 3000)
    .number('p')
    .alias('s', 'socket')
    .describe('s', 'The socket path to which the server will be binded.')
);

const listening = (debug: Debugger, where: string) => (err?: Error) => {
  if (err) throw err;
  debug(`🚀 server is listening on ${where}`);
};

const onSocket = (
  debug: Debugger,
  path: string
): [string, (err?: Error) => void] => [
  path,
  listening(debug, `socket ${path}`),
];

const onPort = (
  debug: Debugger,
  ip: string,
  port: number
): [number, string, (err?: Error) => void] => [
  port,
  ip,
  listening(debug, `http://${ip}:${port}/`),
];

serve(async ({ app, args, debug }) => {
  const server = http.createServer(app);

  args.socket
    ? server.listen(...onSocket(debug, args.socket))
    : server.listen(...onPort(debug, args.ip, args.port));
});
