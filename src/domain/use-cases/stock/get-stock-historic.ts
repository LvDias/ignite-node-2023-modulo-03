import { Buy } from '@/domain/entities/buy'
import { Sale } from '@/domain/entities/sale'
import { BuyRepository } from '@/domain/repositories/buy'
import { SaleRepository } from '@/domain/repositories/sale'

interface GetStockHistoricUseCaseRequest {
  productId: string
  startIn?: Date
  endIn?: Date
}

interface GetStockHistoricUseCaseResponse {
  historic: {
    buy: Buy[] | null
    sale: Sale[] | null
  }
}

export class GetStockHistoricUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private buyRepository: BuyRepository,
  ) {}

  async handle({
    productId,
    startIn,
    endIn,
  }: GetStockHistoricUseCaseRequest): Promise<GetStockHistoricUseCaseResponse> {
    let buy
    let sale

    if (startIn && endIn) {
      buy = await this.buyRepository.findByProductIdStartInEndIn(
        productId,
        startIn,
        endIn,
      )
      sale = await this.saleRepository.findByProductIdStartInEndIn(
        productId,
        startIn,
        endIn,
      )
    } else {
      buy = await this.buyRepository.findByProductId(productId)
      sale = await this.saleRepository.findByProductId(productId)
    }

    return { historic: { buy, sale } }
  }
}
