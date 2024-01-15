export default class OrderItem {
  private _quantity: number;

  constructor(
    private readonly _productSKU: string,
    private readonly _price: number,
  ) {
    this._quantity = 1;
  }

  icreaseQuantityByOne(): void {
    this._quantity += 1;
  }

  get quantity(): number {
    return this._quantity;
  }

  get productSKU(): string {
    return this._productSKU;
  }

  get pricePerItem(): number {
    return this._price;
  }
}
