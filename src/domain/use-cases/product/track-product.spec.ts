import { InMemoryProductRepository } from '@/domain/repositories/in-memory-repository/in-memory-product-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from './create-product'
import { TrackProductUseCase } from './track-product'

let inMemoryProductRepository: InMemoryProductRepository
let createProductUseCase: CreateProductUseCase

describe('track product use case', () => {
  beforeAll(async () => {
    inMemoryProductRepository = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryProductRepository)
  })

  it('should be able to track a product', async () => {
    const trackProductUseCase = new TrackProductUseCase(
      inMemoryProductRepository,
    )

    const createProduct = await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const response = await trackProductUseCase.handle({
      id: createProduct.product.id,
    })

    expect(response.product.id).toEqual(expect.any(String))
  })

  it('should be not able to track a product with wrong id', async () => {
    const trackProductUseCase = new TrackProductUseCase(
      inMemoryProductRepository,
    )

    await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    await expect(() =>
      trackProductUseCase.handle({ id: '123' }),
    ).rejects.toThrowError()
  })
})
