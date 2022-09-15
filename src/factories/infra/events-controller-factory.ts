import { Factory } from '@interfaces/factory'
import { FactoryError } from '@errors/factory-error'
import { EventsController } from '@infra/http/express/controllers/events-controller'
import { EventsServiceFactory } from '@factories/application/events-service-factory'
import { CreateEventFactory } from '@factories/application/create-event-factory'

export class EventsControllerFactory implements Factory<EventsController> {
  async create(): Promise<EventsController> {
    try {
      return new EventsController(
        new EventsServiceFactory().create(),
        await new CreateEventFactory().create()
      )
    } catch (error) {
      throw new FactoryError(EventsControllerFactory, error)
    }
  }
}
