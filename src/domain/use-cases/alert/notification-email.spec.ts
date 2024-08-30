import { InMemoryProductRepository } from '@/domain/repositories/in-memory-repository/in-memory-product-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from '../product/create-product'
import { NotificationSystemUseCase } from './notification-system'
import { InMemoryNotificationRepository } from '@/domain/repositories/in-memory-repository/in-memory-notification-repository'
import { NotificationEmailUseCase } from './notification-email'

let inMemoryProductRepository: InMemoryProductRepository
let createProductUseCase: CreateProductUseCase

describe('notification email use case', () => {
  beforeAll(async () => {
    inMemoryProductRepository = new InMemoryProductRepository()
    createProductUseCase = new CreateProductUseCase(inMemoryProductRepository)
  })

  it('should be able to send notification to email', async () => {
    const productCreated = await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const inMemoryNotificationRepository = new InMemoryNotificationRepository()

    const notificationEmailUseCase = new NotificationEmailUseCase(
      inMemoryNotificationRepository,
      inMemoryProductRepository,
    )

    const response = await notificationEmailUseCase.handle({
      title: 'Estoque',
      description: 'O produto está próximo de acabar',
      productId: productCreated.product.id,
      email: 'test@gmail.com',
    })

    expect(response.notification.id).toEqual(expect.any(String))
  })

  it('should be not able to send notification to email with wrong product id', async () => {
    await createProductUseCase.handle({
      name: 'Caixa de papelão',
      description: 'Uma caixa marrom com 2m quadrados',
      price: 10.5,
    })

    const inMemoryNotificationRepository = new InMemoryNotificationRepository()

    const notificationEmailUseCase = new NotificationEmailUseCase(
      inMemoryNotificationRepository,
      inMemoryProductRepository,
    )

    await expect(() =>
      notificationEmailUseCase.handle({
        title: 'Estoque',
        description: 'O produto está próximo de acabar',
        productId: '123',
        email: 'test@gmail.com',
      }),
    ).rejects.toThrowError()
  })
})
