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

export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

export const userHasAccountFrom = (
  local: Record<string, unknown>,
  context: Record<string, unknown>
): boolean => {
  return !isEmptyObject(local) || !isEmptyObject(context);
};