import { Receiver } from './receiver.model'
import { Event } from './event.model'

export interface Notification {
  event: Event
  receiver: Receiver
  createdAt: Date
}
