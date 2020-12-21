import PropertyValueValidationError from '../errors/PropertyValueValidationError';

/**
 * Makes sure value is non-empty.
 * Providing an empty value will result in a `PropertyValueValidationError` error.
 */
const isRequired = () => {
  return ({
    value,
    requestedEnvNames,
  }: {
    value: string | null;
    requestedEnvNames: string[];
  }): string => {
    if (value != null && value != '') {
      return value;
    }

    throw new PropertyValueValidationError(
      `At least one of the following environment variables must be provided: [ ${requestedEnvNames.join(
        ', '
      )} ]`
    );
  };
};

export default isRequired;
