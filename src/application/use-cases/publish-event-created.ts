import { Publisher } from '@infra/mqtt/publisher'

export class PublishEventCreated {
  async exec(event: Object) {
    const publisher = new Publisher('event-created')
    await publisher.init()
    await publisher.publish(event)
  }
}
