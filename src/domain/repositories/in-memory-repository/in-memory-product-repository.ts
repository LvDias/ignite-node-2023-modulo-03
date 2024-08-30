import { Product } from '@/domain/entities/product'
import { ProductRepository } from '../product'

export class InMemoryProductRepository implements ProductRepository {
  public database: Product[] = []

  async findById(id: string) {
    const response = this.database.find((db) => db.id === id)

    if (!response) {
      return null
    }

    return response
  }

  async create(props: Product) {
    this.database.push(props)
  }
}
