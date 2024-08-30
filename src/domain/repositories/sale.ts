import { Sale } from '../entities/sale'

export interface SaleRepository {
  findByProductIdStartInEndIn(
    id: string,
    startIn: Date,
    endIn: Date,
  ): Promise<Sale[] | null>
  findByProductIdQuantityStock(id: string): Promise<number>
  findByProductId(id: string): Promise<Sale[] | null>
  create(props: Sale): Promise<void>
}
