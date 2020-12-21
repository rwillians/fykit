import ConfigError from './ConfigError';
import PropertyValueBuildingError from './PropertyValueBuildingError';

class ConfigValidationError extends ConfigError {
  public readonly errors;

  constructor(errors: PropertyValueBuildingError[]) {
    super("Ops! There's a few things wrong in your configuration");
    this.errors = errors;
  }
}

export default ConfigValidationError;
