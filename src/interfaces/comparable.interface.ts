export default interface IComparable<T> {
  compare: (object: T) => number;
}
