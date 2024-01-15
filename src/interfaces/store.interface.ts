export default interface IStorage<T> {
  getAll: () => T[];
  save: (items: T | T[]) => void;
  remove: (item: T) => void;
}
