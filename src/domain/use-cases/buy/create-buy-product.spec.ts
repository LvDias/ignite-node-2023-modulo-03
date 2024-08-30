import { InMemoryProductRepository } from '@/domain/repositories/in-memory-repository/in-memory-product-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateBuyProductUseCase } from './create-buy-product'
import { InMemoryBuyRepository } from '@/domain/repositories/in-memory-repository/in-memory-buy-repository'
import { CreateProductUseCase } from '../product/create-product'

let inMemoryProductRepository: InMemoryProductRepository
let createProductUseCase: CreateProductUseCase

describe('create buy product use case', () => {
  beforeAll(async () => {
    inMemoryProductRepository = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryProductRepository)
  })

  it('should be able to create a new buy product', async () => {
    const productCreated = await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const inMemoryBuyRepository = new InMemoryBuyRepository()
    const createBuyProductUseCase = new CreateBuyProductUseCase(
      inMemoryBuyRepository,
      inMemoryProductRepository,
    )

    const response = await createBuyProductUseCase.handle({
      productId: productCreated.product.id,
      quantity: 10,
    })

    expect(response.historic.id).toEqual(expect.any(String))
    expect(response.historic.quantity).toEqual(10)
  })

  it('should be not able to create a new buy product with wrong productId', async () => {
    await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const inMemoryBuyRepository = new InMemoryBuyRepository()
    const createBuyProductUseCase = new CreateBuyProductUseCase(
      inMemoryBuyRepository,
      inMemoryProductRepository,
    )

    await expect(() =>
      createBuyProductUseCase.handle({ productId: '123', quantity: 10 }),
    ).rejects.toThrowError()
  })
})
