/**
 * This function calculates total price of a new order
 * @param products - Array of products with a price
 * @returns Total price as a number
 */
export const totalPrice = (products: { price: number }[]): number => {
    return products.reduce((acc, product) => acc + product.price, 0);
  };
  