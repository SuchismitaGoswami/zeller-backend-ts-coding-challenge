import IPricingRule from "./interfaces/pricing-rule.interface";
import ThreeForTwoPricingRule from "./pricing-rules/three-for-two.pricing-rule";
import BulkDiscountPricingRule from "./pricing-rules/bulk-discount.pricing-rule";
import Checkout from "./services/checkout.service";
import ScannedItemDTO from "./dtos/scanned-item.dto";
import Catalog from "./services/catalog.service";

function adminAPI() {
  // add products to inventory

  const catalog = Catalog.getInstance();
  catalog.addProduct({ sku: "ipd", name: "Super iPad", price: 549.99 });
  catalog.addProduct({ sku: "mbp", name: "MacBook Pro", price: 1399.99 });
  catalog.addProduct({ sku: "atv", name: "Apple TV", price: 109.5 });
  catalog.addProduct({ sku: "vga", name: "VGA adapter", price: 30.0 });

  // see inventory
  console.log(catalog.findProductBySUK("atv"));

  // add pricing rules
  const pricingRules = new Array<IPricingRule>();
  pricingRules.push(new ThreeForTwoPricingRule("atv"));
  pricingRules.push(new BulkDiscountPricingRule("ipd", 4, 499.99));
  return pricingRules;
}

function handle() {
  const pricingRules = adminAPI();

  // test 1
  const checkOut = new Checkout(pricingRules);
  checkOut.scan(new ScannedItemDTO("atv"));
  checkOut.scan(new ScannedItemDTO("atv"));
  checkOut.scan(new ScannedItemDTO("atv"));
  checkOut.scan(new ScannedItemDTO("vga"));
  console.log(checkOut.total());

  // test 2
  const checkOut1 = new Checkout(pricingRules);
  checkOut1.scan(new ScannedItemDTO("atv"));
  // checkOut1.scan(new ScannedItemDTO("ipd"))
  // checkOut1.scan(new ScannedItemDTO("ipd"))
  checkOut1.scan(new ScannedItemDTO("atv"));
  checkOut1.scan(new ScannedItemDTO("atv"));
  checkOut1.scan(new ScannedItemDTO("atv"));
  checkOut1.scan(new ScannedItemDTO("atv"));
  checkOut1.scan(new ScannedItemDTO("atv"));
  // checkOut1.scan(new ScannedItemDTO("ipd"))
  // checkOut1.scan(new ScannedItemDTO("ipd"))
  // checkOut1.scan(new ScannedItemDTO("ipd"))
  console.log(checkOut1.total());
}

handle();
