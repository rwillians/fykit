import PropertyValueCastingError from '../errors/PropertyValueCastingError';

/**
 * Casts a non-empty value into a `number`.
 * If the number has a decimal case, it will be kept.
 * Providing a non-empty non-numeric value will result in a `PropertyValueCastingError` error.
 */
const asNumber = () => {
  return ({
    value,
    originEnvName,
  }: {
    value: string | null;
    originEnvName: string;
  }): Number | null => {
    if (value == null || value == '') {
      return null;
    }

    const numberValue = Number(value);

    if (isNaN(numberValue)) {
      throw new PropertyValueCastingError(
        `Environment variable ${originEnvName} must constain a valid numeric string.`
      );
    }

    return numberValue;
  };
};

export default asNumber;
