import { EventCreatedConsumerFactory } from '@factories/application/event-created-consumer-factory'

async function main() {
  const consumer = await new EventCreatedConsumerFactory().create()
  await consumer.start()
}

void main()
