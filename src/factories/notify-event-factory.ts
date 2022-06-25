import { NotifyEvent } from "@application/use-cases/notify-event";
import { Event } from "@domain/events/event.entity";


export class NotifyEventFactory {
    static create(event: Event): NotifyEvent {
        return new NotifyEvent(event);
    }
}