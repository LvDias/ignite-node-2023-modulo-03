import { Product } from '@/domain/entities/product'
import { ProductRepository } from '@/domain/repositories/product'

interface TrackProductUseCaseRequest {
  id: string
}

interface TrackProductUseCaseResponse {
  product: Product
}

export class TrackProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async handle({
    id,
  }: TrackProductUseCaseRequest): Promise<TrackProductUseCaseResponse> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new Error()
    }

    return { product }
  }
}
