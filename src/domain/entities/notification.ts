import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'

interface NotificationProps {
  title: string
  description: string
  productId: UniqueEntityId
  createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get productId() {
    return this.props.productId.toValue()
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return notification
  }
}
