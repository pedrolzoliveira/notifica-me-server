import { NotificationsRepository } from "@application/repositories/notifications/notifications.repository";


export class NotificationService {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) {}

    findAll(skip?: number) {
        return this.notificationsRepository.findAll(skip);
    }
}