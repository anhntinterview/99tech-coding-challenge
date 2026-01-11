export interface SwapFormData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
}

export interface CalculationResult {
  toAmount: string;
  exchangeRate: number;
}
