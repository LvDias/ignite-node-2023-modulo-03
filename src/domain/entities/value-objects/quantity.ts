export class Quantity {
  public value: number

  toValue() {
    return this.value
  }

  constructor(value: number) {
    this.value = value
  }

  /**
   * Receives a number and through the request we will return it,
   * whether positive or negative.
   *
   * @param number
   * @param order
   * @returns
   */

  static typeOfOrder(number: number, order: boolean) {
    if (order) {
      return new Quantity(number)
    }

    return new Quantity(number * -1)
  }
}
