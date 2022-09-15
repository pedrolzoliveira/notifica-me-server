import { NotificationsRepository } from '@application/repositories/notifications/notifications.repository'

export class NotificationService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async findAll(skip?: number) {
    return await this.notificationsRepository.findAll(skip)
  }
}
