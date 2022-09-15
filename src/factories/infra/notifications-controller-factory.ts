import { NotificationsController } from '@infra/http/express/controllers/notifications.controller'
import { Factory } from '@interfaces/factory'
import { FactoryError } from '@errors/factory-error'
import { NotificationsServiceFactory } from '@factories/application/notifications-service-factory'

export class NotificationsControllerFactory implements Factory<NotificationsController> {
  create(): NotificationsController {
    try {
      return new NotificationsController(
        new NotificationsServiceFactory().create()
      )
    } catch (error) {
      throw new FactoryError(NotificationsControllerFactory, error)
    }
  }
}
