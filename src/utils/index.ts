import type { Account } from "../Types";

/**
 * This function calculates total price of a new order
 * @param products - Array of products with a price
 * @returns Total price as a number
 */
export const totalPrice = (products: { price: number }[]): number => {
    return products.reduce((acc, product) => acc + product.price, 0);
};

export const getParsedStorageObject = (key: string): Record<string, unknown> => {
  const raw = localStorage.getItem(key);
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getParsedBoolean = (key: string): boolean => {
  const raw = localStorage.getItem(key);
  try {
    return raw ? JSON.parse(raw) === true : false;
  } catch {
    return false;
  }
};

export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

export const userHasAccountFrom = (
  local: Record<string, unknown>,
  context: Record<string, unknown>
): boolean => {
  return !isEmptyObject(local) || !isEmptyObject(context);
};

export function getValidAccount(data: unknown): Account | null {
  if (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "email" in data &&
    "password" in data &&
    typeof (data as any).name === "string" &&
    typeof (data as any).email === "string" &&
    typeof (data as any).password === "string"
  ) {
    return data as Account;
  }
  return null;
}