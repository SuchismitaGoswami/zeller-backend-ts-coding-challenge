import OrderItem from "./order-item.entity";
import Product from "./product.entity";

export default class Order {
  private readonly _orderItems: OrderItem[];
  private _totalPrice: number;

  constructor() {
    this._orderItems = new Array<OrderItem>();
    this._totalPrice = 0;
    console.log(this._totalPrice);
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  get orderItems(): OrderItem[] {
    return this._orderItems;
  }

  addItemToOrder(product: Product): void {
    const existingItem = this._orderItems.find((orderItem: OrderItem) => {
      return orderItem.productSKU === product.sku;
    });
    if (existingItem) {
      existingItem.icreaseQuantityByOne();
    } else {
      this._orderItems.push(new OrderItem(product.sku, product.price));
    }
    this._totalPrice = this._totalPrice + product.price;
  }

  applyDiscountedPrice(discountedPrice: number): void {
    this._totalPrice = discountedPrice;
  }
}
