import { CreateEvent } from '@application/use-cases/create-event'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { EventsRepositoryFactory } from './events-repository-factory'

import { NotifyReceiversFactory } from './notify-receivers-factory'

export class CreateEventFactory implements Factory<CreateEvent> {
  create(): CreateEvent {
    try {
      const createEvent = new CreateEvent(
        new NotifyReceiversFactory().create(),
        new EventsRepositoryFactory().create()
      )
      return createEvent
    } catch (error) {
      throw new FactoryError(CreateEventFactory, error)
    }
  }
}
