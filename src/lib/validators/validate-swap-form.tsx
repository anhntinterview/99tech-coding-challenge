import type { SwapFormData } from "../../types/swap-form-data";
import type {
  ValidationErrors,
  ValidationResult,
} from "../../types/validation";

export const validateSwapForm = ({
  data,
}: {
  data: SwapFormData;
}): ValidationResult => {
  const errors: ValidationErrors = {};

  const amount = Number(data.fromAmount);

  if (!data.fromAmount || Number.isNaN(amount) || amount <= 0) {
    errors.fromAmount = "Amount must be greater than 0";
  }

  if (amount > import.meta.env.MAX_AMOUNT) {
    errors.fromAmount = "Amount exceeds maximum limit";
  }
  if (parseFloat(data.fromAmount) > import.meta.env.MAX_AMOUNT) {
    errors.fromAmount = "Amount exceeds maximum limit";
  }

  if (data.fromCurrency === data.toCurrency) {
    errors.currency = "Can not swap the same currency";
  }

  if (!data.fromCurrency || !data.toCurrency) {
    errors.currency = "Please select both currencies";
  }
  return { errors, isValid: Object.keys(errors).length === 0 };
};
