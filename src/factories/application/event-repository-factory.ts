import { CreateEvent } from '@application/use-cases/create-event'
import { FactoryError } from '@errors/factory-error'
import { PublisherFactory } from '@factories/infra/publisher-factory'
import { Factory } from '@interfaces/factory'
import { EventsRepositoryFactory } from './events-repository-factory'

export class CreateEventFactory implements Factory<CreateEvent> {
  async create(): Promise<CreateEvent> {
    try {
      const createEvent = new CreateEvent(
        new EventsRepositoryFactory().create(),
        await new PublisherFactory().create('create-event')
      )
      return createEvent
    } catch (error) {
      throw new FactoryError(CreateEventFactory, error)
    }
  }
}
