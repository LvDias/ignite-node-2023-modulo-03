import { BuyRepository } from '@/domain/repositories/buy'
import { SaleRepository } from '@/domain/repositories/sale'

interface GetStockQuantityProductUseCaseRequest {
  productId: string
}

interface GetStockQuantityProductUseCaseResponse {
  stock: {
    quantity: number
  }
}

export class GetStockQuantityProductUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private buyRepository: BuyRepository,
  ) {}

  async handle({
    productId,
  }: GetStockQuantityProductUseCaseRequest): Promise<GetStockQuantityProductUseCaseResponse> {
    const buy = await this.buyRepository.findByProductIdQuantityStock(productId)
    const sale =
      await this.saleRepository.findByProductIdQuantityStock(productId)

    const response = buy + sale

    return { stock: { quantity: response } }
  }
}
