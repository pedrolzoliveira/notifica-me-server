import { Notification } from "@domain/notification.model";
import { CreateNotification } from "@application/dtos/create-notification.dto";

export interface NotificationsRepository {
    create(data: CreateNotification) : Promise<Notification>;
    findAll(skip: number): Promise<Notification[]>;
}
