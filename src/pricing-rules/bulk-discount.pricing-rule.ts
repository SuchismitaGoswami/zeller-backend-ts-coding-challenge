import IPricingRule from "../interfaces/pricing-rule.interface";
import Order from "../entities/order.entity";
import OrderItem from "../entities/order-item.entity";

export default class BulkDiscountPricingRule implements IPricingRule {
  constructor(
    private readonly _applicableProductSKU: string,
    private readonly _thresholdQuantity: number,
    private readonly _flatPrice: number,
  ) {}

  apply(order: Order): number {
    let totalDiscountedPrice = order.totalPrice;
    const discountedOrderItem = order.orderItems.filter(
      (orderItem: OrderItem) =>
        orderItem.productSKU == this._applicableProductSKU,
    );

    if (
      discountedOrderItem.length > 0 &&
      discountedOrderItem[0].quantity > this._thresholdQuantity
    ) {
      totalDiscountedPrice =
        totalDiscountedPrice -
        discountedOrderItem[0].pricePerItem * discountedOrderItem[0].quantity +
        discountedOrderItem[0].quantity * this._flatPrice;
    }
    return totalDiscountedPrice;
  }
}
