import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClient } from '@prisma/client'

export class PrismaClientFactory implements Factory<PrismaClient> {
  create(): PrismaClient {
    try {
      return new PrismaClient()
    } catch (error) {
      throw new FactoryError(PrismaClientFactory, error)
    }
  }
}
