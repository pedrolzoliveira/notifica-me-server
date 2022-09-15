import { Factory } from '@interfaces/factory'
import { FactoryError } from '@errors/factory-error'
import { EventsService } from '@application/services/events.service'
import { EventsRepositoryFactory } from './events-repository-factory'
import { CreateEventFactory } from './event-repository-factory'
import { PrismaClient } from '@prisma/client'

export class EventsServiceFactory implements Factory<EventsService> {
  create(): EventsService {
    try {
      return new EventsService(
        new EventsRepositoryFactory().create(),
        new CreateEventFactory().create(),
        new PrismaClient()
      )
    } catch (error) {
      throw new FactoryError(EventsServiceFactory, error)
    }
  }
}
