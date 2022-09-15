import { FactoryError } from '@errors/factory-error'
import { CredentialMiddlaware } from '@infra/http/express/middlawares/credentail-middlaware'
import { Factory } from '@interfaces/factory'
import { PrismaClient } from '@prisma/client'

export class CredentialMiddlawareFactory implements Factory<CredentialMiddlaware> {
  create(): CredentialMiddlaware {
    try {
      return new CredentialMiddlaware(new PrismaClient())
    } catch (error) {
      throw new FactoryError(CredentialMiddlawareFactory, error)
    }
  }
}
