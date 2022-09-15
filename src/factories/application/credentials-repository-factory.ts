import { CredentialPrismaRepository } from '@application/repositories/credentials/credentials-prisma.repository'
import { CredentialsRepository } from '@application/repositories/credentials/credentials.repository'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClient } from '@prisma/client'

export class CredentialsRepositoryFactory implements Factory<CredentialsRepository> {
  create(): CredentialsRepository {
    try {
      const prisma = new PrismaClient()
      return new CredentialPrismaRepository(prisma)
    } catch (error) {
      throw new FactoryError(CredentialsRepositoryFactory, error)
    }
  }
}
