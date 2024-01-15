import IComparable from "../interfaces/comparable.interface";

export default class Product implements IComparable<Product> {
  constructor(
    private readonly _sku: string,
    private readonly _name: string,
    private _price: number,
  ) {}

  get sku() {
    return this._sku;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  incrementPriceBy(price: number) {
    this._price += price;
  }

  decrementPriceBy(price: number) {
    this._price -= price;
  }

  compare(product: Product): number {
    return this._name == product._name && this._sku == product._sku ? 0 : 1;
  }
}
