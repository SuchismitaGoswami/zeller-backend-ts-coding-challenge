import Order from "../entities/order.entity";

export default interface IPricingRule {
  apply: (order: Order) => number;
}
