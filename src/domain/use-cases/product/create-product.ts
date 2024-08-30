import { Product } from '@/domain/entities/product'
import { ProductRepository } from '@/domain/repositories/product'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  price: number
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async handle({
    name,
    description,
    price,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({ name, description, price })

    this.productRepository.create(product)

    return { product }
  }
}
