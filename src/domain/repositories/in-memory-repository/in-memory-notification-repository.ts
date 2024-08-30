import { UniqueEntityId } from '@/domain/core/entities/unique-entity-id'
import { NotificationRepository } from '../notification'
import { Notification } from '@/domain/entities/notification'

export class InMemoryNotificationRepository implements NotificationRepository {
  public database: Notification[] = []

  async sendByEmail(props: Notification, email: string) {}

  async sendBySystem(props: Notification) {
    this.database.push(props)
  }
}
