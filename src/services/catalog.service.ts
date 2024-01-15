import ProductRepository from "../respositories/product.repository";
import { InMemoryStorage } from "../storage/in-memory.storage";
import CreateProductDTO from "../dtos/create-product.dto";
import Product from "../entities/product.entity";

export default class Catalog {
  private static instance: Catalog;

  private constructor(
    private readonly _productRepository: ProductRepository = new ProductRepository(
      new InMemoryStorage(),
    ),
  ) {}

  static getInstance(): Catalog {
    if (!Catalog.instance) {
      Catalog.instance = new Catalog();
    }
    return Catalog.instance;
  }

  findProductBySUK(productSUK: string): Product {
    return this.productRepository.findById(productSUK);
  }

  addProduct(productDTO: CreateProductDTO): void {
    const product = this._productRepository.create(productDTO);
    this.productRepository.save(product);
  }

  get productRepository() {
    return this._productRepository;
  }
}
