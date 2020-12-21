import ConfigValidationError from './errors/ConfigValidationError';

const ensureTrailing = (value: string, trailingChar: string) => {
  return value.endsWith(trailingChar) ? value : value + trailingChar
}

/**
 * When there are any validation errors it catches the
 * ConfigValidationError thrown by `config`, prints its
 * validation error messages and then exists with status 1.
 */
const halt = (fn: Function) => {
  return (...args: any[]) => {
    try {
      return fn(...args)
    } catch (err) {
      if (!(err instanceof ConfigValidationError)) {
        throw err
      }

      console.group(ensureTrailing(err.message, ':'))
      err.errors.forEach((e) => {
        console.log('-', ensureTrailing(e.message, '.'))
      })
      console.groupEnd()

      process.exit(1)
    }
  }
}

export default halt;
