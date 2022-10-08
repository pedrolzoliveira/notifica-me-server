import { CustomersPrismaRepository } from '@application/repositories/customers/customers-prisma.repository'
import { CustomersRepository } from '@application/repositories/customers/customers.repository'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClientFactory } from './prisma-client-factory'

export class CustomersRepositoryFactory implements Factory<CustomersRepository> {
  create(): CustomersRepository {
    try {
      return new CustomersPrismaRepository(
        new PrismaClientFactory().create()
      )
    } catch (error) {
      throw new FactoryError(CustomersRepositoryFactory, error)
    }
  }
}
