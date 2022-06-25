import { Event } from "@domain/events/event.entity";
import { EventType } from "@domain/events/event-type.entity";

export class EventFactory {
    static create(): Event {
        const eventType = new EventType('empty-event', 'Empty event', []);
        return new Event(eventType);
    }
}

