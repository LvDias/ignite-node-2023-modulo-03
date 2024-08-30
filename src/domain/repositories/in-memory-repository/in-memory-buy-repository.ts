import { Buy } from '@/domain/entities/buy'
import { BuyRepository } from '../buy'

export class InMemoryBuyRepository implements BuyRepository {
  public database: Buy[] = []

  async findByProductIdStartInEndIn(id: string, startIn: Date, endIn: Date) {
    const response = this.database
      .filter((db) => db.productId === id)
      .filter((db) => db.createdAt > startIn && db.createdAt <= endIn)

    if (response.length === 0) {
      return null
    }

    return response
  }

  async findByProductIdQuantityStock(id: string) {
    const response = this.database
      .filter((db) => db.productId === id)
      .reduce((total, numero) => total + numero.quantity, 0)

    return response
  }

  async findByProductId(id: string) {
    const response = this.database.filter((db) => db.productId === id)

    if (response.length === 0) {
      return null
    }

    return response
  }

  async create(props: Buy) {
    this.database.push(props)
  }
}
