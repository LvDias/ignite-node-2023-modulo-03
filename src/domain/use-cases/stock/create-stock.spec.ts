import { InMemoryProductRepository } from '@/domain/repositories/in-memory-repository/in-memory-product-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from '../product/create-product'
import { CreateStockUseCase } from './create-stock'
import { InMemoryStockRepository } from '@/domain/repositories/in-memory-repository/in-memory-stock-repository'

let inMemoryProductRepository: InMemoryProductRepository
let createProductUseCase: CreateProductUseCase

describe('create stock use case', () => {
  beforeAll(async () => {
    inMemoryProductRepository = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryProductRepository)
  })

  it('should be able to create stock', async () => {
    const productCreated = await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const inMemoryStockRepository = new InMemoryStockRepository()

    const createStockUseCase = new CreateStockUseCase(
      inMemoryStockRepository,
      inMemoryProductRepository,
    )

    const response = await createStockUseCase.handle({
      productId: productCreated.product.id,
      automaticPurchaseQuantity: 10,
      minimumQuantityStock: 10,
      suppliersDeliveryTime: new Date(),
    })

    expect(response.stock.id).toEqual(expect.any(String))
  })
})
