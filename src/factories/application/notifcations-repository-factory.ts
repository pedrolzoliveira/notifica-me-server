import { NotificationsRepository } from '@application/repositories/notifications/notifications.repository'
import { NotificationsPrismaRepository } from '@application/repositories/notifications/notifications-prisma.repository'
import { Factory } from '@interfaces/factory'
import { FactoryError } from '@errors/factory-error'
import { PrismaClientFactory } from './prisma-client-factory'

export class NotificationsRepositoryFactory implements Factory<NotificationsRepository> {
  create(): NotificationsRepository {
    try {
      return new NotificationsPrismaRepository(
        new PrismaClientFactory().create()
      )
    } catch (error) {
      throw new FactoryError(NotificationsRepositoryFactory, error)
    }
  }
}
