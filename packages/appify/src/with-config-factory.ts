import { AppifyFactoryFn, AppifyFactoryFnArg, GenericObject } from './types';

export default (
  appFactory: AppifyFactoryFn,
  configFactory: (arg: AppifyFactoryFnArg) => GenericObject | Promise<GenericObject>
) => {
  return async (props: AppifyFactoryFnArg) => {
    return appFactory({
      ...props,
      config: await Promise.resolve(configFactory({ ...props })),
    });
  };
};
