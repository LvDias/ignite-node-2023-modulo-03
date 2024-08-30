import { InMemoryProductRepository } from '@/domain/repositories/in-memory-repository/in-memory-product-repository'
import { describe, expect, it } from 'vitest'
import { CreateProductUseCase } from './create-product'

describe('create product use case', () => {
  it('should be able to create a new product', async () => {
    const inMemoryProductRepository = new InMemoryProductRepository()
    const createProductUseCase = new CreateProductUseCase(
      inMemoryProductRepository,
    )

    const response = await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    expect(response.product.id).toEqual(expect.any(String))
  })
})
