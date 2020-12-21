/**
 * Replaces an empty value by the given default value.
 * It was not intended to be used with `is.required` since there's
 * apparent reason for such. If by any means you want to use both, make
 * sure to register `is.defaultTo` before `is.required` since the
 * registration order is respected during execution.
 */
const isDefaultTo = (defaultValue: string) => {
  return ({ value }: { value: string | null }): string => {
    return value == null || value == '' ? defaultValue : value;
  };
};

export default isDefaultTo;
