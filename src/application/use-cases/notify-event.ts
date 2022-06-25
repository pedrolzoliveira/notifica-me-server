import { Notifier } from "@domain/notifiers/notifier.entity";
import { Event } from "@domain/events/event.entity";

import { Notification } from "@domain/notifications/notification.entity";

export class NotifyEvent {

    constructor(private event: Event) {}

    exec(notifier: Notifier) : Notification[] {
        const notifications = notifier.getNotifieds().map(notified => {
            return notifier.notify(this.event, notified);
        });
        return notifications;
    }
}