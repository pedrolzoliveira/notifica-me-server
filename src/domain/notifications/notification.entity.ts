import { Notified } from "@domain/notifieds/notified.entity";
import { Event } from "@domain/events/event.entity";
import { Notifier } from "@domain/notifiers/notifier.entity";
import { Messenger } from "@domain/messengers/messenger.entity";

export class Notification {
    
    public createdAt: Date;

    constructor(public notified: Notified, public notifier: Notifier, public event: Event, public messenger: Messenger) {
        this.createdAt = new Date();
    }
}