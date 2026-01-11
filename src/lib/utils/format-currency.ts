export const formatCurrency = ({ value }: { value: number }): string => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatTokenPrice = ({ price }: { price: number }): string => {
  return price.toFixed(2);
};
