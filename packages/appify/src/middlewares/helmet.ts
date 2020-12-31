import helmet from 'helmet';
import { GenericObject } from '../types';

export default (config: GenericObject) => {
  return helmet(config)
}
