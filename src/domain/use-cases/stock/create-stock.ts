import { UniqueEntityId } from '@/domain/core/entities/unique-entity-id'
import { Stock } from '@/domain/entities/stock'
import { ProductRepository } from '@/domain/repositories/product'
import { StockRepository } from '@/domain/repositories/stock'

interface GetStockUseCaseRequest {
  productId: string
  minimumQuantityStock: number
  automaticPurchaseQuantity: number
  suppliersDeliveryTime: Date
}

interface GetStockUseCaseResponse {
  stock: Stock
}

export class CreateStockUseCase {
  constructor(
    private stockRepository: StockRepository,
    private productRepository: ProductRepository,
  ) {}

  async handle({
    productId,
    minimumQuantityStock,
    automaticPurchaseQuantity,
    suppliersDeliveryTime,
  }: GetStockUseCaseRequest): Promise<GetStockUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new Error()
    }

    const stock = Stock.create({
      productId: new UniqueEntityId(productId),
      minimumQuantityStock,
      automaticPurchaseQuantity,
      suppliersDeliveryTime,
    })

    await this.stockRepository.create(stock)

    return { stock }
  }
}
