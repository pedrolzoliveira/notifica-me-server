import { CreateEventType } from '@application/dtos/create-event-type.dto'
import { UpdateEventType } from '@application/dtos/update-event-type.dto'
import { EventTypesRepository } from '@application/repositories/event-types/event-types.repository'
import { PrismaClient } from '@prisma/client'

class hasPermissionDTO {
  adminId: string
  code: string
}

export class EventTypesService {
  constructor(
    private readonly eventTypesRepository: EventTypesRepository,
    private readonly db: PrismaClient
  ) {}

  async create(data: CreateEventType) {
    return await this.eventTypesRepository.create(data)
  }

  async findAll() {
    return await this.eventTypesRepository.findAll()
  }

  async findByCode(code: string) {
    return await this.eventTypesRepository.findByCode(code)
  }

  async update(data: UpdateEventType) {
    return await this.eventTypesRepository.update(data)
  }

  async delete(code: string) {
    return await this.eventTypesRepository.delete(code)
  }

  async hasPermission(data: hasPermissionDTO) {
    const eventType = await this.db.eventType.findUnique({ select: { adminId: true }, where: { code: data.code } })
    return eventType.adminId === data.adminId
  }
}
