import { CreateEvent } from '@application/use-cases/create-event'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { EventsRepositoryFactory } from './events-repository-factory'
import { PublisherFactory } from '@factories/infra/publisher-factory'

export class CreateEventFactory implements Factory<CreateEvent> {
  async create(): Promise<CreateEvent> {
    try {
      return new CreateEvent(
        new EventsRepositoryFactory().create(),
        await new PublisherFactory().create('event-created')
      )
    } catch (error) {
      throw new FactoryError(CreateEventFactory, error)
    }
  }
}
