import { EventCreatedConsumer } from '@application/consumers/event-created-consumer'
import { FactoryError } from '@errors/factory-error'
import { Factory } from '@interfaces/factory'
import { NotifyReceiversFactory } from './notify-receivers-factory'

export class EventCreatedConsumerFactory implements Factory<EventCreatedConsumer> {
  async create (): Promise<EventCreatedConsumer> {
    try {
      return new EventCreatedConsumer(
        new NotifyReceiversFactory().create()
      )
    } catch (error) {
      throw new FactoryError(EventCreatedConsumerFactory, error)
    }
  }
}
