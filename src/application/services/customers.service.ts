import { CreateCustomer } from '@application/dtos/create-customer.dto'
import { CustomersRepository } from '@application/repositories/customers/customers.repository'

export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository
  ) {}

  async create(data: CreateCustomer) {
    return await this.customersRepository.create(data)
  }

  async findAll() {
    return await this.customersRepository.findAll()
  }

  async findByEmail(email: string) {
    return await this.customersRepository.findByEmail(email)
  }
}
