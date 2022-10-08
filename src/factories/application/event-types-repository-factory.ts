import { Factory } from '@interfaces/factory'
import { FactoryError } from '@errors/factory-error'
import { EventTypesRepository } from '@application/repositories/event-types/event-types.repository'
import { EventTypesPrismaRepository } from '@application/repositories/event-types/event-types-prisma.repository'
import { PrismaClientFactory } from './prisma-client-factory'

export class EventTypesRepositoryFactory implements Factory<EventTypesRepository> {
  create(): EventTypesRepository {
    try {
      return new EventTypesPrismaRepository(
        new PrismaClientFactory().create()
      )
    } catch (error) {
      throw new FactoryError(EventTypesRepositoryFactory, error)
    }
  }
}
