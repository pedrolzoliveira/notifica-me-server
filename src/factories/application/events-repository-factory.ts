import { EventsRepository } from '@application/repositories/events/events.repository'
import { EventsPrismaRepository } from '@application/repositories/events/events-prisma.repository'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClient } from '@prisma/client'

export class EventsRepositoryFactory implements Factory<EventsRepository> {
  create(): EventsRepository {
    try {
      const prisma = new PrismaClient()
      return new EventsPrismaRepository(prisma)
    } catch (error) {
      throw new FactoryError(EventsRepositoryFactory, error)
    }
  }
}
