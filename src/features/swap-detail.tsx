import * as React from "react";
import { ErrorMessage } from "../components/error-message";

type SwapDetailType = {
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  error?: string;
};

export const SwapDetail: React.FC<SwapDetailType> = ({
  fromCurrency,
  toCurrency,
  exchangeRate,
  error,
}) => (
  <>
    {!error && (
      <div className="bg-[#333] rounded-xl p-4 mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#fff]">Exchange rate: </span>
          <span className="text-white font-medium">
            1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
          </span>
        </div>
      </div>
    )}
    {error && <ErrorMessage message={error} />}
  </>
);
