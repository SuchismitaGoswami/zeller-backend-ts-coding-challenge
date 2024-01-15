import IStorage from "../interfaces/store.interface";
import IComparable from "../interfaces/comparable.interface";

export class InMemoryStorage<T extends IComparable<T>> implements IStorage<T> {
  constructor(private _itemStore: T[] = new Array<T>()) {}

  getAll() {
    return this._itemStore;
  }

  remove(itemToDelete: T): void {
    this._itemStore = this._itemStore.filter((item: T) =>
      item.compare(itemToDelete),
    );
  }

  save(items: T | T[]): void {
    console.log("save called");
    if (Array.isArray(items)) {
      items.forEach((item) => {
        this._itemStore.push(item);
      });
    } else {
      this._itemStore.push(items);
    }
  }
}
