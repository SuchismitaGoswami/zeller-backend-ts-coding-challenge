export default class CreateProductDTO {
  constructor(
    public readonly sku: string,
    public readonly name: string,
    public price: number,
  ) {}
}
