import { UniqueEntityId } from '@/domain/core/entities/unique-entity-id'
import { Sale } from '@/domain/entities/sale'
import { Quantity } from '@/domain/entities/value-objects/quantity'
import { ProductRepository } from '@/domain/repositories/product'
import { SaleRepository } from '@/domain/repositories/sale'

interface CreateSaleProductUseCaseRequest {
  productId: string
  quantity: number
}

interface CreateSaleProductUseCaseResponse {
  historic: Sale
}

export class CreateSaleProductUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private productRepository: ProductRepository,
  ) {}

  async handle({
    productId,
    quantity,
  }: CreateSaleProductUseCaseRequest): Promise<CreateSaleProductUseCaseResponse> {
    const doesThisIdExist = await this.productRepository.findById(productId)

    if (!doesThisIdExist) {
      throw new Error()
    }

    const product = Sale.create({
      productId: new UniqueEntityId(productId),
      quantity: Quantity.typeOfOrder(quantity, false),
    })

    this.saleRepository.create(product)

    return { historic: product }
  }
}
