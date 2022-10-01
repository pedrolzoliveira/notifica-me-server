import { EventTypesService } from '@application/services/event-types.service'

import { EventTypesRepositoryFactory } from './event-types-repository-factory'

import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { PrismaClient } from '@prisma/client'

export class EventTypeServiceFactory implements Factory<EventTypesService> {
  create(): EventTypesService {
    try {
      const eventTypesRepository = new EventTypesRepositoryFactory().create('prisma')
      const eventTypesService = new EventTypesService(eventTypesRepository, new PrismaClient())
      return eventTypesService
    } catch (error) {
      throw new FactoryError(EventTypeServiceFactory, error)
    }
  }
}
