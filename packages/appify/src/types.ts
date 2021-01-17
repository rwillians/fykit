import { RequestListener } from 'http';
import { Router } from 'express';

type Logger = {
  error(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
};

type GenericObject = {
  [key: string]: any
};

type UserlandConfigFactoryFn = (environment: string, config?: GenericObject) => GenericObject | Promise<GenericObject>
type UserlandConfigArg = GenericObject | UserlandConfigFactoryFn

type AppifyFactoryFnArg = {
  config?: GenericObject | UserlandConfigFactoryFn;
  environment: string;
  logger?: Logger;
  [key: string]: any;
};

type AppifyFactoryCallbackArg = {
  config?: GenericObject;
  environment: string;
  logger?: Logger;
  router: Router;
  [key: string]: any;
};

type AppifyFactoryFn = (
  arg: AppifyFactoryCallbackArg
) => Promise<RequestListener>;

export {
  AppifyFactoryCallbackArg,
  AppifyFactoryFn,
  AppifyFactoryFnArg,
  GenericObject,
  Logger,
  RequestListener,
  Router,
  UserlandConfigArg,
  UserlandConfigFactoryFn,
};
