import BulkDiscountPricingRule from "../../../src/pricing-rules/bulk-discount.pricing-rule";
import { orderStub } from "../test-doubles/stubs/order.stub";

describe("BulkDiscountPricingRule", () => {
  let bulkDiscountPricingRule: BulkDiscountPricingRule;

  beforeAll(() => {
    bulkDiscountPricingRule = new BulkDiscountPricingRule("atv", 2, 100);
  });

  it("rule does not apply when items scanned in bulk amount < threshold", function () {
    let discountedPrice = bulkDiscountPricingRule.apply(
      orderStub("atv", 1, 150),
    );
    expect(discountedPrice).toBe(150);
  });

  it("rule does not apply when items scanned in bulk amount == threshold", function () {
    let discountedPrice = bulkDiscountPricingRule.apply(
      orderStub("atv", 3, 150),
    );
    expect(discountedPrice).toBe(300);
  });

  it("rule is appled when items scanned in bulk amount > threshold", function () {
    let discountedPrice = bulkDiscountPricingRule.apply(
      orderStub("atv", 3, 150),
    );
    expect(discountedPrice).toBe(300);
  });

  it("rule doesn't apply when items, not eligible for bunk discount, scanned in bulk amount > threshold", function () {
    let discountedPrice = bulkDiscountPricingRule.apply(
      orderStub("tpd", 3, 10),
    );
    expect(discountedPrice).toBe(30);
  });
});
