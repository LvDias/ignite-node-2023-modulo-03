import { InMemoryProductRepository } from '@/domain/repositories/in-memory-repository/in-memory-product-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from '../product/create-product'
import { InMemoryBuyRepository } from '@/domain/repositories/in-memory-repository/in-memory-buy-repository'
import { CreateSaleProductUseCase } from '../sale/create-sale-product'
import { InMemorySaleRepository } from '@/domain/repositories/in-memory-repository/in-memory-sale-repository'
import { GetStockQuantityProductUseCase } from './get-stock-quantity-product'
import { CreateBuyProductUseCase } from '../buy/create-buy-product'

let inMemoryProductRepository: InMemoryProductRepository
let createProductUseCase: CreateProductUseCase

let createBuyProductUseCase: CreateBuyProductUseCase
let inMemoryBuyRepository: InMemoryBuyRepository

let createSaleProductUseCase: CreateSaleProductUseCase
let inMemorySaleRepository: InMemorySaleRepository

describe('get stock quantity product use case', () => {
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

  it('should be able to search stock of quantity product', async () => {
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

    const getStockUseCase = new GetStockQuantityProductUseCase(
      inMemorySaleRepository,
      inMemoryBuyRepository,
    )

    const response = await getStockUseCase.handle({
      productId: productCreated.product.id,
    })

    expect(response.stock.quantity).toEqual(10)
  })
})
