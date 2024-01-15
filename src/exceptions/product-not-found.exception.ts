export class ProductNotFoundException extends Error {
  constructor(
    productName: string,
    message: string = `${productName} not found!`,
  ) {
    super(message);
  }
}
