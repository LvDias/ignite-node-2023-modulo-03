import { UniqueEntityId } from '@/domain/core/entities/unique-entity-id'
import { Notification } from '@/domain/entities/notification'
import { NotificationRepository } from '@/domain/repositories/notification'
import { ProductRepository } from '@/domain/repositories/product'

interface NotificationEmailUseCaseRequest {
  title: string
  description: string
  productId: string
  email: string
}

interface NotificationEmailUseCaseResponse {
  notification: Notification
}

export class NotificationEmailUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private productRepository: ProductRepository,
  ) {}

  async handle({
    title,
    description,
    productId,
    email,
  }: NotificationEmailUseCaseRequest): Promise<NotificationEmailUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new Error()
    }

    const notification = Notification.create({
      title,
      description,
      productId: new UniqueEntityId(productId),
    })

    await this.notificationRepository.sendByEmail(notification, email)

    return { notification }
  }
}
