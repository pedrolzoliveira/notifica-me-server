import { EventType } from '@domain/event-type.model'
import { CreateEventType } from '@application/dtos/create-event-type.dto'
import { UpdateEventType } from '@application/dtos/update-event-type.dto'

export interface EventTypesRepository {
  create: (data: CreateEventType) => Promise<EventType>
  findByCode: (code: string) => Promise<EventType | null>
  findAll: () => Promise<EventType[]>
  update: (data: UpdateEventType) => Promise<EventType>
  delete: (code: string) => Promise<void>
}
