"use client";

import * as React from "react";
import type { ValidationErrors } from "../types/validation";
import type { CalculationResult } from "../types/swap-form-data";
import { calculateExchangeRate } from "../lib/utils/caculate-exchange-rate";
import type { ActionState } from "../types/action";
import { ArrowLoop } from "../icons/arrow-loop";
import { Zap } from "../icons/zap";
import { InputSection } from "./input-section";
import { SwapDetail } from "./swap-detail";
import { tokenIconMap } from "../lib/icon";
import type { TokenPriceMeta } from "../types/token-price";

export const CurrencySwapForm: React.FC<{
  data: ActionState | null;
}> = ({ data }) => {
  const [fc, setFc] = React.useState<string>("ETH"); // from currency
  const [tc, setTc] = React.useState<string>("USDC"); // to currency
  const [fa, setFa] = React.useState<string>(""); // from amount
  const [errors, setErrors] = React.useState<ValidationErrors>({});

  const [isPending, startTransition] = React.useTransition();
  const deferredFa = React.useDeferredValue(fa);

  const getPrice = React.useCallback(
    (currency: string): number => {
      return data?.result?.find((t) => t.currency === currency)?.price || 0;
    },
    [data?.result]
  );

  const calculationResult: CalculationResult = React.useMemo(() => {
    const fromPrice = getPrice(fc);
    const toPrice = getPrice(tc);
    return calculateExchangeRate({
      fromPrice,
      toPrice,
      amount: deferredFa,
    });
  }, [fc, tc, deferredFa, getPrice]);

  const handleSwapCurrencies = React.useCallback(() => {
    startTransition(() => {
      setFc(tc);
      setTc(fc);
      setFa(calculationResult.toAmount || "");
      setErrors({});
    });
  }, [fc, tc, calculationResult.toAmount]);

  // Handle amount change
  const handleAmountChange = React.useCallback((value: string) => {
    if (value === "") {
      setFa("");
      setErrors((prev) => ({ ...prev, fromAmount: undefined }));
      return;
    }

    const num = Number(value);

    if (Number.isNaN(num) || num <= 0) {
      setFa(value);
      setErrors((prev) => ({
        ...prev,
        fromAmount: "Amount must be greater than 0",
      }));
      return;
    }

    setFa(value);
    setErrors((prev) => ({ ...prev, fromAmount: undefined }));
  }, []);

  // get token data
  const fromToken = React.useMemo(
    () => data?.result?.find((t) => t.currency === fc),
    [data?.result, fc]
  );
  const toToken = React.useMemo(
    () => data?.result?.find((t) => t.currency === tc),
    [data?.result, tc]
  );

  const tokensWithMeta: Array<TokenPriceMeta> = React.useMemo(() => {
    if (!data?.result) return [];
    return data?.result?.map((token, index) => ({
      ...token,
      id: index + 1,
      icon: tokenIconMap[token.currency],
    }));
  }, [data]);

  if (!data?.success) {
    return <h2>NO DATA</h2>;
  }

  console.log(errors);

  return (
    <div className="min-h-screen bg-[#ccc] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[#000]">
            <Zap className="w-12 h-12" />
            Swap
          </h1>
        </div>
        <>
          <InputSection
            label="From "
            amount={fa}
            currency={fc}
            onAmountChange={handleAmountChange}
            onCurrencyChange={setFc}
            error={errors.fromAmount}
            tokenData={fromToken}
            tokensWithMeta={tokensWithMeta}
          />
          <div className="flex justify-center -my-2 relative z-10">
            <button
              type="button"
              onClick={handleSwapCurrencies}
              disabled={isPending}
              className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl border-4 border-slate-800/50 transition-all hover:scale-110 disabled:opacity-50"
            >
              <ArrowLoop className="" />
            </button>
          </div>
          <InputSection
            label="To "
            amount={calculationResult.toAmount}
            currency={tc}
            onAmountChange={() => {}}
            onCurrencyChange={setTc}
            readOnly
            error={errors.fromAmount}
            tokenData={toToken}
            tokensWithMeta={tokensWithMeta}
          />

          {!errors.fromAmount && fa && calculationResult.toAmount && (
            <SwapDetail
              fromCurrency={fc}
              toCurrency={tc}
              exchangeRate={calculationResult.exchangeRate}
              error={errors.fromAmount}
            />
          )}
        </>
      </div>
    </div>
  );
};
