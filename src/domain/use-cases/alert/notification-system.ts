import { UniqueEntityId } from '@/domain/core/entities/unique-entity-id'
import { Notification } from '@/domain/entities/notification'
import { NotificationRepository } from '@/domain/repositories/notification'
import { ProductRepository } from '@/domain/repositories/product'

interface NotificationSystemUseCaseRequest {
  title: string
  description: string
  productId: string
}

interface NotificationSystemUseCaseResponse {
  notification: Notification
}

export class NotificationSystemUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private productRepository: ProductRepository,
  ) {}

  async handle({
    title,
    description,
    productId,
  }: NotificationSystemUseCaseRequest): Promise<NotificationSystemUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new Error()
    }

    const notification = Notification.create({
      title,
      description,
      productId: new UniqueEntityId(productId),
    })

    await this.notificationRepository.sendBySystem(notification)

    return { notification }
  }
}
