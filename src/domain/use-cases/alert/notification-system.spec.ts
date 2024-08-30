import { InMemoryProductRepository } from '@/domain/repositories/in-memory-repository/in-memory-product-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from '../product/create-product'
import { NotificationSystemUseCase } from './notification-system'
import { InMemoryNotificationRepository } from '@/domain/repositories/in-memory-repository/in-memory-notification-repository'

let inMemoryProductRepository: InMemoryProductRepository
let createProductUseCase: CreateProductUseCase

describe('notification system use case', () => {
  beforeAll(async () => {
    inMemoryProductRepository = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryProductRepository)
  })

  it('should be able to send notification system', async () => {
    const productCreated = await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const inMemoryNotificationRepository = new InMemoryNotificationRepository()

    const notificationSystemUseCase = new NotificationSystemUseCase(
      inMemoryNotificationRepository,
      inMemoryProductRepository,
    )

    const response = await notificationSystemUseCase.handle({
      title: 'Estoque',
      description: 'O produto está próximo de acabar',
      productId: productCreated.product.id,
    })

    expect(response.notification.id).toEqual(expect.any(String))
  })

  it('should be not able to send notification system with wrong product id', async () => {
    await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const inMemoryNotificationRepository = new InMemoryNotificationRepository()

    const notificationSystemUseCase = new NotificationSystemUseCase(
      inMemoryNotificationRepository,
      inMemoryProductRepository,
    )

    await expect(() =>
      notificationSystemUseCase.handle({
        title: 'Estoque',
        description: 'O produto está próximo de acabar',
        productId: '123',
      }),
    ).rejects.toThrowError()
  })
})
