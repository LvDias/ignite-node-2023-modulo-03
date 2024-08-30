import { InMemoryProductRepository } from '@/domain/repositories/in-memory-repository/in-memory-product-repository'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  vitest,
} from 'vitest'
import { CreateProductUseCase } from '../product/create-product'
import { InMemoryBuyRepository } from '@/domain/repositories/in-memory-repository/in-memory-buy-repository'
import { CreateSaleProductUseCase } from '../sale/create-sale-product'
import { InMemorySaleRepository } from '@/domain/repositories/in-memory-repository/in-memory-sale-repository'
import { GetStockHistoricUseCase } from './get-stock-historic'
import { CreateBuyProductUseCase } from '../buy/create-buy-product'

let inMemoryProductRepository: InMemoryProductRepository
let createProductUseCase: CreateProductUseCase

let createBuyProductUseCase: CreateBuyProductUseCase
let inMemoryBuyRepository: InMemoryBuyRepository

let createSaleProductUseCase: CreateSaleProductUseCase
let inMemorySaleRepository: InMemorySaleRepository

describe('get stock use case', () => {
  beforeAll(async () => {
    inMemoryProductRepository = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryProductRepository)

    inMemoryBuyRepository = new InMemoryBuyRepository()
    createBuyProductUseCase = new CreateBuyProductUseCase(
      inMemoryBuyRepository,
      inMemoryProductRepository,
    )

    inMemorySaleRepository = new InMemorySaleRepository()
    createSaleProductUseCase = new CreateSaleProductUseCase(
      inMemorySaleRepository,
      inMemoryProductRepository,
    )
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to search stock', async () => {
    const productCreated = await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    await createBuyProductUseCase.handle({
      productId: productCreated.product.id,
      quantity: 10,
    })
    await createBuyProductUseCase.handle({
      productId: productCreated.product.id,
      quantity: 5,
    })

    await createSaleProductUseCase.handle({
      productId: productCreated.product.id,
      quantity: 5,
    })

    const getStockUseCase = new GetStockHistoricUseCase(
      inMemorySaleRepository,
      inMemoryBuyRepository,
    )

    const response = await getStockUseCase.handle({
      productId: productCreated.product.id,
    })

    expect(response.historic.buy).toHaveLength(2)
    expect(response.historic.sale).toHaveLength(1)
  })

  it('should be able to search stock with dates', async () => {
    const productCreated = await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const oldDate = new Date('2024-10-15T12:00:00')
    vi.setSystemTime(oldDate)

    await createBuyProductUseCase.handle({
      productId: productCreated.product.id,
      quantity: 10,
    })

    const newDate = new Date('2024-10-20T12:00:00')
    vi.setSystemTime(newDate)

    await createBuyProductUseCase.handle({
      productId: productCreated.product.id,
      quantity: 5,
    })
    await createSaleProductUseCase.handle({
      productId: productCreated.product.id,
      quantity: 5,
    })

    const getStockUseCase = new GetStockHistoricUseCase(
      inMemorySaleRepository,
      inMemoryBuyRepository,
    )

    const response = await getStockUseCase.handle({
      productId: productCreated.product.id,
      startIn: new Date('2024-10-16T12:00:00'),
      endIn: new Date('2024-10-20T12:00:00'),
    })

    expect(response.historic.buy).toHaveLength(1)
    expect(response.historic.sale).toHaveLength(1)
  })
})
