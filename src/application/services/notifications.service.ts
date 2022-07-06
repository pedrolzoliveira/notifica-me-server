import { NotificationsRepository } from "@application/repositories/notifications/notifications.repository";


export class NotificationService {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) {}

    findAll() {
        return this.notificationsRepository.findAll();
    }
}