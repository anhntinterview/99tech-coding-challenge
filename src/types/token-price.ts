export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface TokenPriceMeta extends TokenPrice {
  icon?: string;
  id: number;
}
