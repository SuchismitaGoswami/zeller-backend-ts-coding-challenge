import IRepository from "../interfaces/repository.interface";
import Product from "../entities/product.entity";
import IStore from "../interfaces/store.interface";
import { ProductNotFoundException } from "../exceptions/product-not-found.exception";
import InvalidArgumentException from "../exceptions/invalid-argument.exception";

export default class ProductRepository implements IRepository<Product> {
  constructor(private readonly _store: IStore<Product>) {}

  create(object: Record<string, any>): Product {
    if (!("sku" in object) || !("name" in object) || !("price" in object))
      throw new InvalidArgumentException(
        "Product should contain keys: [sku, name, price]",
      );
    return new Product(object.sku, object.name, object.price);
  }

  save(product: Product): void {
    const productFound: Product = this._store
      .getAll()
      .find((item) => item.compare(product) == 0)!;
    if (productFound) {
      this._store.remove(productFound);
    }

    this._store.save(product);
  }

  delete(sku: string | number): Product {
    const product = this._store
      .getAll()
      .find((item: Product) => item.sku == sku);
    if (!product) {
      throw new ProductNotFoundException(sku as string);
    }
    this._store.remove(product);
    return product;
  }

  findById(sku: string | number): Product {
    const product = this._store
      .getAll()
      .find((item: Product) => item.sku == sku);
    if (!product) {
      throw new ProductNotFoundException(sku as string);
    }
    return product;
  }

  findAll(): Product[] {
    return this._store.getAll();
  }
}
