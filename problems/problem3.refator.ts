type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const PRIORITY_MAP: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const rows = React.useMemo(
  () =>
    formattedBalances.map((balance) => {
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

      return (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`}
          className={classes.row}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }),
  [formattedBalances, prices]
);
