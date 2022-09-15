import { CreateReceiver } from '@application/dtos/create-receiver.dto'
import { DeleteReceiverDTO } from '@application/dtos/delete-receiver.dto'
import { RegisterEventCustomer } from '@application/dtos/register-event-customer.dto'
import { UpdateReceiver } from '@application/dtos/update-receiver.dto'
import { Event } from '@domain/event.model'
import { Receiver } from '@domain/receiver.model'

export interface ReceiversRepository {
  getByEvent: (type: string) => Promise<Receiver[]>
  findAll: (customerId: string) => Promise<Receiver[]>
  create: (data: CreateReceiver) => Promise<Receiver>
  registerEvent: (data: RegisterEventCustomer) => Promise<void>
  delete: (data: DeleteReceiverDTO) => Promise<void>
  update: (data: UpdateReceiver) => Promise<Receiver>
  getUnotifiedReceivers: (event: Event) => Promise<Receiver[]>
}
