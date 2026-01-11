import type { CalculationResult } from "../../types/swap-form-data";

export const calculateExchangeRate = ({
  fromPrice,
  toPrice,
  amount,
}: {
  fromPrice: number;
  toPrice: number;
  amount: string;
}): CalculationResult => {
  const amountNum = Number(amount);

  if (
    Number.isNaN(amountNum) ||
    amountNum <= 0 ||
    fromPrice <= 0 ||
    toPrice <= 0
  ) {
    return {
      toAmount: "",
      exchangeRate: 0,
    };
  }

  if (!amount || !fromPrice || !toPrice) {
    return { toAmount: "", exchangeRate: 0 };
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    return { toAmount: "", exchangeRate: 0 };
  }

  const rate = fromPrice / toPrice;
  const calculatedAmount = parsedAmount * rate;

  return {
    toAmount: calculatedAmount.toFixed(6),
    exchangeRate: rate,
  };
};
