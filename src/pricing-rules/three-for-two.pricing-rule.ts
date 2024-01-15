import IPricingRule from "../interfaces/pricing-rule.interface";
import Order from "../entities/order.entity";
import OrderItem from "../entities/order-item.entity";

export default class ThreeForTwoPricingRule implements IPricingRule {
  constructor(private readonly _applicableProductSKU: string) {}

  apply(order: Order): number {
    let updatedTotalPrice = order.totalPrice;
    const discountedOrderItems = order.orderItems.filter(
      (orderItem: OrderItem) =>
        orderItem.productSKU == this._applicableProductSKU,
    );

    if (
      discountedOrderItems.length > 0 &&
      discountedOrderItems[0].quantity >= 3
    ) {
      updatedTotalPrice =
        updatedTotalPrice -
        (1 / 3) *
          discountedOrderItems[0].quantity *
          discountedOrderItems[0].pricePerItem;
    }

    return updatedTotalPrice;
  }
}
