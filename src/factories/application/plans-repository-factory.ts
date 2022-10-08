import { PlansRepository } from '@application/repositories/plans/plans.repository'
import { PlansPrismaRepository } from '@application/repositories/plans/plans-prisma.repository'
import { Factory } from '@interfaces/factory'
import { FactoryError } from '@errors/factory-error'
import { PrismaClientFactory } from './prisma-client-factory'

export class PlansRepositoryFactory implements Factory<PlansRepository> {
  create(): PlansRepository {
    try {
      return new PlansPrismaRepository(
        new PrismaClientFactory().create()
      )
    } catch (error) {
      throw new FactoryError(PlansRepositoryFactory, error)
    }
  }
}
