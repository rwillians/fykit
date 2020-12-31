import debugFactory from 'debug';
import morgan from 'morgan';

const debug = debugFactory('appify:request');

export default ({ format }: { format: string }) => {
  const stream = {
    write: (string: string) => { debug(string.replace(/\n/, '')) }
  }

  return morgan(format, { stream })
}
