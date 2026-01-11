import type { TokenPrice, TokenPriceMeta } from "../types/token-price";
import { formatCurrency } from "../lib/utils/format-currency";
import { ErrorMessage } from "../components/error-message";

type InputSectionType = {
  tokensWithMeta: Array<TokenPriceMeta>;
  label: string;
  amount: string;
  currency: string;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (currency: string) => void;
  readOnly?: boolean;
  error?: string;
  tokenData?: TokenPrice;
  showQuickAmounts?: boolean;
  onQuickAmount?: (percentage: number) => void;
};

export const InputSection: React.FC<InputSectionType> = ({
  tokensWithMeta,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  readOnly = false,
  tokenData,
  error,
}) => {
  const iconSrc = tokensWithMeta.filter(
    (token) => token.currency === currency
  )[0].icon;
  return (
    <div className="bg-[#eee] rounded-2xl p-4">
      <div className="flex gap-3 items-center w-full">
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          readOnly={readOnly}
          placeholder="0.00"
          className="flex-1 bg-transparent text-3xl font-bold text-[#000] outline-none placeholder-[#000]"
        />

        {
          <img
            className="w-6 h-6 shrink-0"
            src={iconSrc}
            alt={`_${currency}`}
          />
        }
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="
            w-[95px]
            shrink-0
            bg-[#ddd]
            text-[#000]
            px-4 py-2
            rounded-xl
            font-semibold
            cursor-pointer
            outline-none
            transition-colors
            hover:bg-black hover:text-[#fff]
          "
        >
          {tokensWithMeta.map((token) => (
            <option key={token.id} value={token.currency}>
              {token.currency}
            </option>
          ))}
        </select>
      </div>

      {tokenData && Number(amount) > 0 && (
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-[#000]">
            $
            {formatCurrency({
              value: Number(amount) * tokenData.price,
            })}
          </span>
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
