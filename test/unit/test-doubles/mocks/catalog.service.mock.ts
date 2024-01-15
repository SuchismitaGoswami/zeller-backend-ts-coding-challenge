import Product from "../../../../src/entities/product.entity";
import Catalog from "../../../../src/services/catalog.service";

export const mockedCatalog: Catalog = {
  findProductBySUK: jest.fn().mockImplementation((sku: string) => {
    return new Product(sku, "Fake Product", 100);
  }),

  addProduct: jest.fn().mockReturnThis(),
} as Object as Catalog;
