import { ReceiversRepository } from '@application/repositories/receivers/receivers.repository'
import { ReceiversPrismaRepository } from '@application/repositories/receivers/receivers-prisma.repository'
import { Factory } from '@interfaces/factory'
import { FactoryError } from '@errors/factory-error'
import { PrismaClientFactory } from './prisma-client-factory'

export class ReceiversRepositoryFactory implements Factory<ReceiversRepository> {
  create(): ReceiversRepository {
    try {
      return new ReceiversPrismaRepository(
        new PrismaClientFactory().create()
      )
    } catch (error) {
      throw new FactoryError(ReceiversRepositoryFactory, error)
    }
  }
}
