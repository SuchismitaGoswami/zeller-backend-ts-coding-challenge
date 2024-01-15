import IPricingRule from "../interfaces/pricing-rule.interface";
import ScannedItemDTO from "../dtos/scanned-item.dto";
import Catalog from "./catalog.service";
import Order from "../entities/order.entity";
import { ProductNotFoundException } from "../exceptions/product-not-found.exception";

export default class Checkout {
  private readonly _catalogService: Catalog;
  private readonly _order: Order;

  constructor(private readonly pricingRules: IPricingRule[]) {
    this._catalogService = Catalog.getInstance();
    this._order = new Order();
    console.log(this._order);
  }

  scan(scannedItem: ScannedItemDTO): boolean {
    try {
      const product = this._catalogService.findProductBySUK(scannedItem.suk);
      this._order.addItemToOrder(product);
      return true;
    } catch (error) {
      if (error instanceof ProductNotFoundException)
        console.error(
          `Scanned product ${scannedItem.suk} doesn't exist in catalog !`,
        );
      else console.log(`Internal server error: ${error}`);
      return false;
    }
  }

  private _applyPricingRules() {
    this.pricingRules.forEach((pricingRule: IPricingRule) => {
      let discountedPrice = pricingRule.apply(this._order);
      // console.debug(discountedPrice)
      if (discountedPrice != this._order.totalPrice)
        this._order.applyDiscountedPrice(discountedPrice);
    });
  }

  total() {
    this._applyPricingRules();
    console.log(this._order);
    return this._order.totalPrice;
  }
}
