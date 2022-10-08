import { EventsRepository } from '@application/repositories/events/events.repository'
import { EventsPrismaRepository } from '@application/repositories/events/events-prisma.repository'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClientFactory } from './prisma-client-factory'

export class EventsRepositoryFactory implements Factory<EventsRepository> {
  create(): EventsRepository {
    try {
      return new EventsPrismaRepository(
        new PrismaClientFactory().create()
      )
    } catch (error) {
      throw new FactoryError(EventsRepositoryFactory, error)
    }
  }
}
