import { Buy } from '../entities/buy'

export interface BuyRepository {
  findByProductIdStartInEndIn(
    id: string,
    startIn: Date,
    endIn: Date,
  ): Promise<Buy[] | null>
  findByProductIdQuantityStock(id: string): Promise<number>
  findByProductId(id: string): Promise<Buy[] | null>
  create(props: Buy): Promise<void>
}
