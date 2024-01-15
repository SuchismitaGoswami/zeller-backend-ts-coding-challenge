jest.mock("../../../src/storage/in-memory.storage");

import ProductRepository from "../../../src/respositories/product.repository";
import { InMemoryStorage } from "../../../src/storage/in-memory.storage";
import Product from "../../../src/entities/product.entity";
import { productStub } from "../test-doubles/stubs/product.stub";
import InvalidArgumentException from "../../../src/exceptions/invalid-argument.exception";
import { ProductNotFoundException } from "../../../src/exceptions/product-not-found.exception";
describe("ProductRepository", () => {
  let productRepository: ProductRepository;
  let mockInMemoryStorage: InMemoryStorage<Product>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockInMemoryStorage = new InMemoryStorage();
    productRepository = new ProductRepository(mockInMemoryStorage);
  });

  describe("constructor", () => {
    it("product repository defined w", () => {
      expect(productRepository).toBeDefined();
    });
  });

  describe("create", () => {
    it("returns the product entity from the given object", () => {
      let product = productRepository.create(
        productStub("atv", "Apple TV", 500),
      );
      expect(product).toBeInstanceOf(Product);
      expect(product).toEqual({
        _sku: "atv",
        _name: "Apple TV",
        _price: 500,
      });
    });

    it("throws InvalidArgumentException for the given object", () => {
      expect(() => {
        productRepository.create({});
      }).toThrow(InvalidArgumentException);
    });
  });

  describe("save", () => {
    it("product is saved successfully when this item was not present in the store", () => {
      const product = new Product("atv", "Apple TV", 1330);
      jest
        .spyOn(mockInMemoryStorage, "getAll")
        .mockReturnValue([new Product("atv", "New Apple TV", 1330)]);
      productRepository.save(product);
      expect(mockInMemoryStorage.save).toHaveBeenCalledWith(product);
      expect(mockInMemoryStorage.remove).toHaveBeenCalledTimes(0);
    });

    it("product is saved successfully when this item was present in the store", () => {
      const product = new Product("atv", "Apple TV", 1330);
      jest.spyOn(mockInMemoryStorage, "getAll").mockReturnValue([product]);
      productRepository.save(product);
      expect(mockInMemoryStorage.save).toHaveBeenCalledWith(product);
      expect(mockInMemoryStorage.remove).toHaveBeenCalledWith(product);
    });
  });

  describe("delete", () => {
    it("Successful deletion of product from store when it exists", () => {
      const product = new Product("atv", "Apple TV", 1330);
      jest.spyOn(mockInMemoryStorage, "getAll").mockReturnValue([product]);
      let productSUK = "atv";
      expect(productRepository.delete(productSUK)).toBe(product);
      expect(mockInMemoryStorage.getAll).toHaveBeenCalledTimes(1);
    });

    it("deletion of product store throws exception when it doesn't exist", () => {
      const product = new Product("atv", "Apple TV", 1330);
      jest.spyOn(mockInMemoryStorage, "getAll").mockReturnValue([product]);
      let productSUK = "ipd";
      expect(() => {
        productRepository.delete(productSUK);
      }).toThrowError(ProductNotFoundException);
      expect(mockInMemoryStorage.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findById", () => {
    it("returns the product when it exists in the store ", () => {
      const productSUK = "atv";
      jest
        .spyOn(mockInMemoryStorage, "getAll")
        .mockReturnValue([new Product(productSUK, "Apple TV", 1222)]);
      expect(productRepository.findById(productSUK)).toEqual({
        _sku: "atv",
        _name: "Apple TV",
        _price: 1222,
      });
    });

    it("throws ProductNotFound exception when it exists in the store ", () => {
      const productSUK = "atv";
      jest
        .spyOn(mockInMemoryStorage, "getAll")
        .mockReturnValue([new Product("ipd", "Apple Ipad", 1202)]);
      expect(() => {
        productRepository.findById(productSUK);
      }).toThrowError(ProductNotFoundException);
    });
  });
});
