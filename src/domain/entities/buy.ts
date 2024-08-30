import { Quantity } from './value-objects/quantity'
import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'

interface BuyProps {
  productId: UniqueEntityId
  quantity: Quantity
  createdAt: Date
}

export class Buy extends Entity<BuyProps> {
  get productId() {
    return this.props.productId.toValue()
  }

  get quantity() {
    return this.props.quantity.toValue()
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<BuyProps, 'createdAt'>, id?: UniqueEntityId) {
    const historic = new Buy(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return historic
  }
}
