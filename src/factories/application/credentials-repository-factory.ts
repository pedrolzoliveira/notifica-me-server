import { CredentialPrismaRepository } from '@application/repositories/credentials/credentials-prisma.repository'
import { CredentialsRepository } from '@application/repositories/credentials/credentials.repository'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClientFactory } from './prisma-client-factory'

export class CredentialsRepositoryFactory implements Factory<CredentialsRepository> {
  create(): CredentialsRepository {
    try {
      return new CredentialPrismaRepository(
        new PrismaClientFactory().create()
      )
    } catch (error) {
      throw new FactoryError(CredentialsRepositoryFactory, error)
    }
  }
}
