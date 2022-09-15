import { Event } from '@domain/event.model'
import { EventsRepository } from './events.repository'
import { CreateEvent } from '@application/dtos/create-event.dto'
import { Prisma, PrismaClient } from '@prisma/client'

export class EventsPrismaRepository implements EventsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateEvent): Promise<Event> {
    const event = await this.prisma.event.create({ data })
    return event
  }

  async findAll({ code, skip }: { code?: string, skip?: number }): Promise<Event[]> {
    const args: Prisma.EventFindManyArgs = {
      orderBy: {
        createdAt: 'desc'
      },
      skip: skip ?? 0,
      take: 20
    }
    if (code) args.where.code = code
    return await this.prisma.event.findMany(args)
  }
}
