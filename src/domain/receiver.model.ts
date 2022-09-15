import { Customer } from './customer.model'

export type MessengerType = 'whatsapp' | 'telegram' | 'sms'

export interface Receiver {
  id?: string
  customer?: Customer
  name: string
  events?: any[]
  number: string
  messenger: MessengerType
}
