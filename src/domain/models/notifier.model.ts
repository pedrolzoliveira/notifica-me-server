import { Event } from "@domain/models/event.model";
import { EventType } from "@domain/models/event-type.model";
import { Notification } from "@domain/models/notification.model";
import { Notified } from "@domain/models/notified.model";
import { Messenger } from "@domain/models/messenger.model";

export interface INotifier {
    notify(event: Event, notified: Notified): void;
    getNotifieds(): Notified[];
    subscribe(notified: Notified): void;
    unsubscribe(notified: Notified): void;
    getEventTypes(): EventType[];
    subscribeEventType(eventType: EventType): void;
    unscribeEventType(eventType: EventType): void;
}

export class Notifier implements INotifier {
    
    private EventTypes: EventType[];
    private notifieds: Notified[];
    private messenger: Messenger

    constructor() {
        this.EventTypes = [];
        this.notifieds = [];
    }

    public notify(event: Event, notified: Notified) : Notification {
        return new Notification(notified, this, event, this.messenger);
    }

    public subscribe(notified: Notified) {
        this.notifieds.push(notified);
    }

    public unsubscribe(notified: Notified) {
        this.notifieds = this.notifieds.filter(n => n !== notified);
    }

    public getNotifieds() {
        return this.notifieds;
    }

    public getEventTypes() {
        return this.EventTypes;
    }
    
    public subscribeEventType(eventType: EventType) {
        this.EventTypes.push(eventType);
    }

    public unscribeEventType(eventType: EventType) {
        this.EventTypes = this.EventTypes.filter(n => n !== eventType);
    }

}
