import type { TokenPrice } from "../../types/token-price";

export const promiseData = (
  data: Array<TokenPrice>
): Promise<Array<TokenPrice>> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, 1000)
  );
