import { PlansService } from '@application/services/plans.service'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClient } from '@prisma/client'
import { PlansRepositoryFactory } from './plans-repository-factory'

export class PlansServiceFactory implements Factory<PlansService> {
  create(): PlansService {
    try {
      return new PlansService(
        new PlansRepositoryFactory().create(),
        new PrismaClient()
      )
    } catch (error) {
      throw new FactoryError(PlansServiceFactory, error)
    }
  }
}
