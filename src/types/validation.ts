export type ValidationErrors = {
  fromAmount?: string;
  currency?: string;
};

export interface ValidationResult {
  errors: ValidationErrors;
  isValid: boolean;
}
