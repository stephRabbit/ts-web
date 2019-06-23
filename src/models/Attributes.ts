export class Attributes<T> {
  constructor(private data: T) { }

  /**
   * Constraint - K can only be one of the keys of T
   * @param key - is of type K
   * @returns type T[K] - object lookup
   */
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  /**
   * Get all properties
   * @returns T - shape of interface
   */
  getAll(): T {
    return this.data
  }

  /**
   * Update current object - this.data
   * @param update - shape of interface
   */
  set(update: T): void {
    Object.assign(this.data, update)
  }
}