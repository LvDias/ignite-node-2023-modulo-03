import { Sale } from '@/domain/entities/sale'
import { SaleRepository } from '../sale'

export class InMemorySaleRepository implements SaleRepository {
  public database: Sale[] = []

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

  async create(props: Sale) {
    this.database.push(props)
  }
}
