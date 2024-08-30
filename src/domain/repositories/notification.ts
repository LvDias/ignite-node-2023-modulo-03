import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Notification } from '../entities/notification'

export interface NotificationRepository {
  sendBySystem(props: Notification): Promise<void>
  sendByEmail(props: Notification, email: string): Promise<void>
}
