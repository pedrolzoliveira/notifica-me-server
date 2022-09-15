import { CreateNotification } from '@application/dtos/create-notification.dto'
import { Notification } from '@domain/notification.model'
import { NotificationsRepository } from './notifications.repository'
import { PrismaClient } from '@prisma/client'

export class NotificationsPrismaRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateNotification): Promise<Notification> {
    return await this.prisma.notification.create({
      data: {
        eventId: data.event.id,
        receiverId: data.receiver.id
      },
      select: { event: true, receiver: true, createdAt: true }
    })
  }

  async findAll(skip: number): Promise<Notification[]> {
    return await this.prisma.notification.findMany({
      select: {
        event: true,
        receiver: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20,
      skip
    })
  }
}
