import { Notified } from "@domain/models/notified.model";
import { Event } from "@domain/models/event.model";
import { Notifier } from "@domain/models/notifier.model";
import { Messenger } from "@domain/models/messenger.model";

export class Notification {
    
    public createdAt: Date;

    constructor(public notified: Notified, public notifier: Notifier, public event: Event, public messenger: Messenger) {
        this.createdAt = new Date();
    }
}