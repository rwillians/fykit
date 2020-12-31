import { RequestListener } from 'http';

type Logger = {
  error(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
};

type GenericObject = {
  [key: string]: any
};

type UserlandConfig = GenericObject;

type AppifyFactoryFnArg = {
  config?: UserlandConfig;
  environment: string;
  logger?: Logger;
  [key: string]: any;
};

type AppifyFactoryFn = (
  arg: AppifyFactoryFnArg
) => Promise<RequestListener>;

export {
  AppifyFactoryFn,
  AppifyFactoryFnArg,
  GenericObject,
  Logger,
  RequestListener,
  UserlandConfig,
};
