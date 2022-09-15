import { CreateEventType } from '@application/dtos/create-event-type.dto';
import { UpdateEventType } from '@application/dtos/update-event-type.dto';
import { EventTypesRepository } from '@application/repositories/event-types/event-types.repository';
import { PrismaClient } from '@prisma/client';

class hasPermissionDTO {
  adminId: string
    code: string
}

export class EventTypesService {
  constructor(
    private readonly eventTypesRepository: EventTypesRepository,
    private readonly db: PrismaClient
  ) {}

  create(data: CreateEventType) {
    return this.eventTypesRepository.create(data)
    }

  findAll() {
    return this.eventTypesRepository.findAll()
    }

  findByCode(code: string) {
    return this.eventTypesRepository.findByCode(code)
    }

  update(data: UpdateEventType) {
    return this.eventTypesRepository.update(data)
    }

  delete async (code: string) {
    return this.eventTypesRepository.delete(code)
    }

  async hasPermission(data: hasPermissionDTO) {
    const eventType = await this.db.eventType.findUnique({ select: { adminId: true }, where: { code: data.code } })
        return eventType.adminId === data.adminId
    }

}
