import { Stock } from '../entities/stock'

export interface StockRepository {
  create(props: Stock): Promise<void>
}
