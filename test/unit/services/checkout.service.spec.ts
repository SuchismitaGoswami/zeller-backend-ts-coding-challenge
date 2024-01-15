jest.spyOn(global.console, "log").mockImplementation();
jest.spyOn(global.console, "warn").mockImplementation();
jest.spyOn(global.console, "error").mockImplementation();

jest.mock("../../../src/respositories/product.repository");

jest.mock("../../../src/services/catalog.service");

import { mockedCatalog } from "../test-doubles/mocks/catalog.service.mock";
import Catalog from "../../../src/services/catalog.service";
jest.spyOn(Catalog, "getInstance").mockReturnValue(mockedCatalog);

import Checkout from "../../../src/services/checkout.service";
jest.mock("../../../src/pricing-rules/three-for-two.pricing-rule");
import ThreeForTwoPricingRule from "../../../src/pricing-rules/three-for-two.pricing-rule";

import ScannedItemDTO from "../../../src/dtos/scanned-item.dto";
import { ProductNotFoundException } from "../../../src/exceptions/product-not-found.exception";
import { productStub } from "../test-doubles/stubs/product.stub";

describe("Checkout", () => {
  let checkoutService: Checkout;
  let mockedThreeForTwoRule: ThreeForTwoPricingRule;
  let mockedCatalog: Catalog;

  beforeEach(() => {
    mockedCatalog = Catalog.getInstance();
    mockedThreeForTwoRule = new ThreeForTwoPricingRule("atv");
    checkoutService = new Checkout([mockedThreeForTwoRule]);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // mockedCatalogSpy.mockReset()
  });

  it("checkout constructor", () => {
    expect(checkoutService).toBeDefined();
  });

  describe("scan", () => {
    it("succesfully scanned atv", () => {
      expect(checkoutService.scan(new ScannedItemDTO("atv"))).toBeTruthy();
    });

    it("failed scanning atv, as product doesn't exist in catalog", () => {
      jest.spyOn(mockedCatalog, "findProductBySUK").mockImplementation(() => {
        throw new ProductNotFoundException("not found");
      });
      expect(checkoutService.scan(new ScannedItemDTO("atv"))).toBeFalsy();
      expect(mockedCatalog.findProductBySUK).toHaveBeenCalledTimes(1);
    });
  });

  describe("total", () => {
    it("return the total = zero, when no item scanned", () => {
      jest.spyOn(mockedThreeForTwoRule, "apply").mockReturnValue(0);
      expect(checkoutService.total()).toBe(0);
      expect(mockedCatalog.findProductBySUK).toHaveBeenCalledTimes(0);
      expect(mockedThreeForTwoRule.apply).toHaveBeenCalledTimes(1);
    });

    it("return the total = sum(item.price) when 2 items scanned and no discount applicable ", () => {
      jest
        .spyOn(Catalog.prototype, "findProductBySUK")
        .mockReturnValue(productStub("atv", "TV", 100));
      checkoutService.scan(new ScannedItemDTO("atv"));
      jest
        .spyOn(Catalog.prototype, "findProductBySUK")
        .mockReturnValue(productStub("ipd", "Ipad", 300));
      checkoutService.scan(new ScannedItemDTO("ipd"));
      let totalOrder = 400;
      jest
        .spyOn(jest.mocked(ThreeForTwoPricingRule).prototype, "apply")
        .mockReturnValue(totalOrder);
      expect(checkoutService.total()).toBe(totalOrder);
      expect(mockedCatalog.findProductBySUK).toHaveBeenCalledTimes(2);
      expect(mockedThreeForTwoRule.apply).toHaveBeenCalledTimes(1);
    });

    it("return the total = sum(item.price) when 4 items scanned and 1 (3 for 2) discount applicable ", () => {
      jest
        .spyOn(Catalog.prototype, "findProductBySUK")
        .mockReturnValue(productStub("atv", "TV", 100));
      checkoutService.scan(new ScannedItemDTO("atv"));
      checkoutService.scan(new ScannedItemDTO("atv"));
      checkoutService.scan(new ScannedItemDTO("atv"));

      jest
        .spyOn(Catalog.prototype, "findProductBySUK")
        .mockReturnValue(productStub("ipd", "Ipad", 300));
      checkoutService.scan(new ScannedItemDTO("ipd"));

      // when no pricing rule
      let totalOrder = 600;
      jest
        .spyOn(jest.mocked(ThreeForTwoPricingRule).prototype, "apply")
        .mockReturnValue(totalOrder);
      expect(checkoutService.total()).toBe(totalOrder);

      // when rule applied
      jest.spyOn(mockedThreeForTwoRule, "apply").mockReturnValue(500);
      let discountedPrice = 500;
      jest
        .spyOn(jest.mocked(ThreeForTwoPricingRule).prototype, "apply")
        .mockReturnValue(discountedPrice);
      expect(checkoutService.total()).toBe(discountedPrice);
      expect(mockedCatalog.findProductBySUK).toHaveBeenCalledTimes(4);
      expect(mockedThreeForTwoRule.apply).toHaveBeenCalledTimes(2);
    });
  });
});
