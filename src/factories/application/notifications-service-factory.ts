import { NotificationService } from "@application/services/notifications.service";

import { Factory } from "@interfaces/factory";
import { FactoryError } from "@errors/factory-error";
import { NotificationsRepositoryFactory } from "./notifcations-repository-factory";


export class NotificationsServiceFactory implements Factory<NotificationService> {
    create(): NotificationService {
        try {
            return new NotificationService(
                new NotificationsRepositoryFactory().create()
            );
        } catch(error) {
            throw new FactoryError(NotificationsServiceFactory, error);
        }
    }
}