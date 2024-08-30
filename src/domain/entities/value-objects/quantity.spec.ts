import { expect, test } from 'vitest'
import { Quantity } from './quantity'

test('quantity value object', () => {
  const positive = Quantity.typeOfOrder(10, true)
  const negative = Quantity.typeOfOrder(5, false)

  expect(positive.value).toEqual(10)
  expect(negative.value).toEqual(-5)
})
