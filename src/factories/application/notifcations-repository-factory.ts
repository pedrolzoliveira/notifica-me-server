import { PrismaClient } from '@prisma/client'
import { NotificationsRepository } from '@application/repositories/notifications/notifications.repository'
import { NotificationsPrismaRepository } from '@application/repositories/notifications/notifications-prisma.repository'
// import {  } from "@application/repositories/notifications/notifications-mock.repository";
import { Factory } from '@interfaces/factory'

import { FactoryError } from '@errors/factory-error'

type Repo = 'prisma' | 'mock'

export class NotificationsRepositoryFactory implements Factory<NotificationsRepository> {
  create(repo: Repo = 'prisma'): NotificationsRepository {
    try {
      switch (repo) {
        case 'prisma': {
          const prisma = new PrismaClient()
          return new NotificationsPrismaRepository(prisma)
        }
                // case "mock": {
                //     return new ReceiversMockRepository();
                // }
      }
    } catch (error) {
      throw new FactoryError(NotificationsRepositoryFactory, error)
    }
  }
}
