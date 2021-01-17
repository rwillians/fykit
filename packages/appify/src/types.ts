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

type AppifyBootupFnArg = {
  config?: UserlandConfigArg;
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

type AppifyFactoryCallbackFn = (
  arg: AppifyFactoryCallbackArg
) => void | Promise<void>;

type AppifyBootupFn = (arg: AppifyBootupFnArg) => Promise<RequestListener>
type AppifyFactoryFn = (cb: AppifyFactoryCallbackFn) => AppifyBootupFn

export {
  AppifyBootupFn,
  AppifyBootupFnArg,
  AppifyFactoryCallbackArg,
  AppifyFactoryCallbackFn,
  AppifyFactoryFn,
  GenericObject,
  Logger,
  RequestListener,
  Router,
  UserlandConfigArg,
  UserlandConfigFactoryFn,
};
