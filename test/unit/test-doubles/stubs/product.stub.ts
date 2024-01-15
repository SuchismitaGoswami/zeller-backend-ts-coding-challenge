import Product from "../../../../src/entities/product.entity";

export const productStub = (
  sku: string,
  name: string,
  price: number,
): Product => {
  return {
    sku,
    name,
    price,
  } as Product;
};
