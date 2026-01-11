import { promiseData } from "../lib/api/data";
import { normalizeError, type ActionState } from "../types/action";
import type { TokenPrice } from "../types/token-price";

export async function fetchData(
  data: Array<TokenPrice>
): Promise<ActionState | null> {
  try {
    const rs = await promiseData(data);
    return { message: "succes", success: true, result: rs };
  } catch (err: unknown) {
    const error = normalizeError(err);
    return { message: "failed", errors: error, success: false };
  }
}
