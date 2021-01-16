import { AppifyFactoryFn, AppifyFactoryFnArg, UserlandConfigArg } from './types';

export default (
  appFactory: AppifyFactoryFn,
  config: UserlandConfigArg
) => {
  return async (props: AppifyFactoryFnArg) => {
    return appFactory({ ...props, config });
  };
};
