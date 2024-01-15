import ThreeForTwoPricingRule from "../../../src/pricing-rules/three-for-two.pricing-rule";
import { orderStub } from "../test-doubles/stubs/order.stub";

describe("ThreeForTwoPricingRule", () => {
  let threeForTwoPricingRule: ThreeForTwoPricingRule;

  beforeAll(() => {
    threeForTwoPricingRule = new ThreeForTwoPricingRule("ipd");
  });

  it("rule doesn't apply when items (marked for 3 for 2) scanned with amount < 3", () => {
    let order = orderStub("ipd", 1, 150);
    let discountedPrice = threeForTwoPricingRule.apply(order);
    expect(discountedPrice).toBe(150);
  });

  it("rule applied when items (marked for 3 for 2) scanned with amount > 3", () => {
    let order = orderStub("ipd", 3, 150);
    let discountedPrice = threeForTwoPricingRule.apply(order);
    expect(discountedPrice).toBe(300);
  });

  it("rule applied twice when items (marked for 3 for 2) scanned with amount == 6", () => {
    let order = orderStub("ipd", 6, 150);
    let discountedPrice = threeForTwoPricingRule.apply(order);
    expect(discountedPrice).toBe(600);
  });

  it("rule doesn't apply items scanned with amount not eligible for discount", () => {
    let order = orderStub("atv", 6, 150);
    let discountedPrice = threeForTwoPricingRule.apply(order);
    expect(discountedPrice).toBe(900);
  });
});
