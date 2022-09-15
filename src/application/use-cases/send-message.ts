import { Receiver } from '@domain/receiver.model'

export class SendMessage {
  constructor(private readonly receiver: Receiver) {}

  exec(message: string) {
  }
}
