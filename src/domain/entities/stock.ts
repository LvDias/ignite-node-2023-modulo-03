import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'

interface StockProps {
  productId: UniqueEntityId
  minimumQuantityStock: number
  automaticPurchaseQuantity: number
  suppliersDeliveryTime: Date
  createdAt: Date
}

export class Stock extends Entity<StockProps> {
  get productId() {
    return this.props.productId.toValue()
  }

  get minimumQuantityStock() {
    return this.props.minimumQuantityStock
  }

  get automaticPurchaseQuantity() {
    return this.props.automaticPurchaseQuantity
  }

  get suppliersDeliveryTime() {
    return this.props.suppliersDeliveryTime
  }

  get createdAt() {
    return this.props.createdAt
  }

  set suppliersDeliveryTime(suppliersDeliveryTime: Date) {
    if (suppliersDeliveryTime > this.props.suppliersDeliveryTime) {
      this.props.suppliersDeliveryTime = suppliersDeliveryTime
    }
  }

  static create(props: Optional<StockProps, 'createdAt'>, id?: UniqueEntityId) {
    const stock = new Stock(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return stock
  }
}
