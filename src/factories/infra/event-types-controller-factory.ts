import { EventTypesController } from '@infra/http/express/controllers/event-types.controller'

import { EventTypeServiceFactory } from '@factories/application/event-types-service-factory'

import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'

export class EventTypesControllerFactory implements Factory<EventTypesController> {
  create(): EventTypesController {
    try {
      const eventTypeService = new EventTypeServiceFactory().create()
      const eventTypesController = new EventTypesController(eventTypeService)
      return eventTypesController
    } catch (error) {
      throw new FactoryError(EventTypesControllerFactory, error)
    }
  }
}
