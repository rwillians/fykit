import PropertyValueCastingError from '../errors/PropertyValueCastingError';

const BOOLEAN_LIKE_TRUTHY = ['1', 'true'];
const BOOLEAN_LIKE_FALSEY = ['0', 'false'];
const BOOLEAN_LIKE = BOOLEAN_LIKE_TRUTHY.concat(BOOLEAN_LIKE_FALSEY);

/**
 * Casts a boolean-like value into a `boolean`.
 * Acceptable boolean-like values are:
 *    - "0"     -> `false`
 *    - "false" -> `false`
 *    - "1"     -> `true
 *    - "true"  -> `true`
 * Providing a non-empty non-boolean-like value will result in a `PropertyValueCastingError` error.
 */
const asBoolean = () => {
  return ({
    value,
    originEnvName,
  }: {
    value: string | null;
    originEnvName: string;
  }): boolean | null => {
    if (value == null || value == '') {
      return null;
    }

    const lowercaseValue = value.toLowerCase();

    if (!BOOLEAN_LIKE.includes(lowercaseValue)) {
      throw new PropertyValueCastingError(
        `Environment variable ${originEnvName} must be a valid boolean-like string value: [ "0", "false", "1", "true" ].`
      );
    }

    return BOOLEAN_LIKE_TRUTHY.includes(lowercaseValue);
  };
};

export default asBoolean;
