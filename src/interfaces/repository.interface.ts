export default interface IRepository<T> {
  create: (object: Record<string, any>) => T;
  save: (item: T) => void;
  delete: (id: number | string) => T;
  findById: (id: number | string) => T;
  findAll: () => T[];
}
