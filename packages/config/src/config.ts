import env from 'sugar-env';

import ConfigValidationError from './errors/ConfigValidationError';
import PropertyValueBuildingError from './errors/PropertyValueBuildingError';

import asBoolean from './casters/as-boolean';
import asInteger from './casters/as-integer';
import asNumber from './casters/as-number';

import isDefaultTo from './validators/is-default-to';
import isRequired from './validators/is-required';
import isUrl from './validators/is-url';

const casters = {
  boolean: asBoolean,
  integer: asInteger,
  number: asNumber,
};

const validators = {
  defaultTo: isDefaultTo,
  required: isRequired,
  url: isUrl,
};

const config = (
  fn: (arg: {
    env: (lookupNames: string | string[], middlewares: Function[]) => any;
    is: typeof validators;
    as: typeof casters;
  }) => any
): any => {
  const errors: PropertyValueBuildingError[] = [];

  const get = (
    lookupNames: string | string[],
    middlewares: Function[] = []
  ): any | null => {
    const requestedEnvNames = Array.isArray(lookupNames)
      ? lookupNames
      : [lookupNames];

    let originalValue: string | null = null;
    let originEnvName: string | null = null;

    for (originEnvName of requestedEnvNames) {
      originalValue = env.get(originEnvName as string);
      if (originalValue) break;
    }

    try {
      return middlewares.reduce(
        (value: any | null, middleware) =>
          middleware({
            value,
            originalValue,
            originEnvName,
            requestedEnvNames,
          }),
        originalValue
      );
    } catch (err) {
      if (!(err instanceof PropertyValueBuildingError)) {
        throw err;
      }

      errors.push(err);
    }

    return null;
  };

  const value = fn({ env: get, is: validators, as: casters });

  if (errors.length > 0) {
    throw new ConfigValidationError(errors);
  }

  return value;
};

export default config;
