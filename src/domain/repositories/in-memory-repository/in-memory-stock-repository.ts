import { Stock } from '@/domain/entities/stock'
import { StockRepository } from '../stock'

export class InMemoryStockRepository implements StockRepository {
  public database: Stock[] = []

  async create(props: Stock) {
    this.database.push(props)
  }
}
