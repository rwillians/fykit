import PropertyValueValidationError from '../errors/PropertyValueValidationError';
import { URL } from 'url';

/**
 * When providing a non-empty value, it tries to parse the value as an URL
 * as a way to prove it is a valid URL. Be aware that, when doing so, node's URL
 * core module ensures a trailing slash after the hostname when no path is given.
 * Providing a non-empty not valid value will result in a `PropertyValueValidationError` error.
 */
const isUrl = () => {
  return ({
    value,
    originEnvName,
  }: {
    value: string | null;
    originEnvName: string;
  }): string | null => {
    if (value == null || value == '') {
      return null;
    }

    try {
      return new URL(value).toString();
    } catch (err) {
      throw new PropertyValueValidationError(
        `Environment variable ${originEnvName}}must constain a valid URL.`
      );
    }
  };
};

export default isUrl;
