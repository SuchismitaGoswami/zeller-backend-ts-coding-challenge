import Order from "../../../../src/entities/order.entity";
import OrderItem from "../../../../src/entities/order-item.entity";

export const orderStub = (
  productSKU: string,
  quantity: number,
  pricePerItem: number,
): Order => {
  return {
    totalPrice: pricePerItem * quantity,
    orderItems: [
      {
        productSKU: productSKU,
        quantity: quantity,
        pricePerItem: pricePerItem,
      } as Partial<OrderItem>,
    ],
  } as Order;
};
