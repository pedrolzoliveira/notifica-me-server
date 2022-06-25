import { Notification } from "@domain/notification.model";
import { CreateNotification } from "@application/dtos/create-notification.dto";

export interface NotificationRepository {
    create(data: CreateNotification) : Promise<Notification>
}