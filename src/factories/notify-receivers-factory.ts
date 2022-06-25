import { NotifyReceivers } from "@application/use-cases/notify-receivers";
import { Event } from "@domain/event.model";
import { Notification } from "@domain/notification.model";
import { Messenger } from "@application/messenger/messenger";

import { NotificationRepository } from "@application/repositories/notification.repository";
import { ReceiverRepository } from "@application/repositories/receiver.repository";

export class NotifyReceiversFactory {
    create(event: Event) {
        const notificationRepository: NotificationRepository = {
            create: async (data) => {
                return {} as any;
            }
        }
        const receiverRepository:ReceiverRepository = {
            getByEvent: async (type) => {
                return []
            }
        }
        // return new NotifyReceivers(event, new Messenger(), receiverRepository, notificationRepository)
    }
}