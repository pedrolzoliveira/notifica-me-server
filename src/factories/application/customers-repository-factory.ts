import { CustomersPrismaRepository } from '@application/repositories/customers/customers-prisma.repository'
import { CustomersRepository } from '@application/repositories/customers/customers.repository'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClient } from '@prisma/client'

export class CustomersRepositoryFactory implements Factory<CustomersRepository> {
  create(): CustomersRepository {
    try {
      const prisma = new PrismaClient()
      return new CustomersPrismaRepository(prisma)
    } catch (error) {
      throw new FactoryError(CustomersRepositoryFactory, error)
    }
  }
}
