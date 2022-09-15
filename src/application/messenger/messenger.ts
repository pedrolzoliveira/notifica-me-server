import { MessengerType } from '@domain/receiver.model'

export interface Messenger {
  sendMessage: ({
    by, number, message
  }: {
    by: MessengerType, number: string, message: string
  }) => Promise<any>
}
