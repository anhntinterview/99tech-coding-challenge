import type { TokenPrice } from "./token-price";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: unknown;
  result?: Array<TokenPrice>;
};

export function normalizeError(err: unknown) {
  if (err instanceof Error) {
    return {
      message: err.message,
    };
  }

  return {
    message: "Unexpected error occurred",
  };
}
