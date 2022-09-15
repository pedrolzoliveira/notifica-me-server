import { NotificationService } from '@application/services/notifications.service'
import { Controller } from './controller'

export class NotificationsController extends Controller {
  constructor(
    private readonly notificationsService: NotificationService
  ) {
    super({
      route: 'notifications',
      handlers: [
        {
          method: 'get',
          handlerFunction: async (req, res) => {
            const notifications = await this.notificationsService.findAll()
            return res.status(200).send({ notifications })
          }
        }
      ]
    })
  }
}
