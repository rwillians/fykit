import asNumber from './as-number';

/**
 * Casts a non-empty value into an `integer`.
 * If the number has a decimal case, it will be simply dropped.
 * For example, if value is "56.78" it will be casted as `integer` "56".
 * Providing a non-empty non-numeric value will result in a `PropertyValueCastingError` error.
 */
const asInteger = () => {
  return (arg: {
    value: string | null;
    originEnvName: string;
  }): Number | null => {
    const value = asNumber()(arg);

    return value == null ? null : ~~value;
  };
};

export default asInteger;
