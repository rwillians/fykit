import { AppifyBootupFn, AppifyBootupFnArg, UserlandConfigArg } from './types';

export default (
  appFactory: AppifyBootupFn,
  config: UserlandConfigArg
) => {
  return async (props: AppifyBootupFnArg) => {
    return appFactory({ ...props, config });
  };
};
