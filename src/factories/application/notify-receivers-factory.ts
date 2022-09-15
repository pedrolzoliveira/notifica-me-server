import { NotifyReceivers } from '@application/use-cases/notify-receivers'
import { MessengerFactory } from './messenger-factory'
import { ReceiversRepositoryFactory } from './receivers-repository-factory'
import { NotificationsRepositoryFactory } from './notifcations-repository-factory'

import { Factory } from '@interfaces/factory'

import { FactoryError } from '@errors/factory-error'
export class NotifyReceiversFactory implements Factory<NotifyReceivers> {
  create(): NotifyReceivers {
    try {
      const messenger = new MessengerFactory().create()
      const receiversRepository = new ReceiversRepositoryFactory().create()
      const notificationsRepository = new NotificationsRepositoryFactory().create()
      return new NotifyReceivers(messenger, receiversRepository, notificationsRepository)
    } catch (error) {
      throw new FactoryError(NotifyReceiversFactory, error)
    }
  }
}
