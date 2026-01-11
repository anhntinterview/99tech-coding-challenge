import { fetchData } from "./actions/fetch-data";
import "./App.css";
import { CurrencySwapForm } from "./features/currency-swap-form";
import { useQuery } from "@tanstack/react-query";
import { tokenPricesData } from "./lib/prices";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["token-prices"],
    queryFn: () => fetchData(tokenPricesData),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data || !data.success) {
    return <div>Failed to load data</div>;
  }

  return <CurrencySwapForm data={data} />;
}

export default App;
