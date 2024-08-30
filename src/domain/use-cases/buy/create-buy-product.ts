import { UniqueEntityId } from '@/domain/core/entities/unique-entity-id'
import { Buy } from '@/domain/entities/buy'
import { Quantity } from '@/domain/entities/value-objects/quantity'
import { BuyRepository } from '@/domain/repositories/buy'
import { ProductRepository } from '@/domain/repositories/product'

interface CreateBuyProductUseCaseRequest {
  productId: string
  quantity: number
}

interface CreateBuyProductUseCaseResponse {
  historic: Buy
}

export class CreateBuyProductUseCase {
  constructor(
    private buyRepository: BuyRepository,
    private productRepository: ProductRepository,
  ) {}

  async handle({
    productId,
    quantity,
  }: CreateBuyProductUseCaseRequest): Promise<CreateBuyProductUseCaseResponse> {
    const doesThisIdExist = await this.productRepository.findById(productId)

    if (!doesThisIdExist) {
      throw new Error()
    }

    const product = Buy.create({
      productId: new UniqueEntityId(productId),
      quantity: Quantity.typeOfOrder(quantity, true),
    })

    this.buyRepository.create(product)

    return { historic: product }
  }
}
