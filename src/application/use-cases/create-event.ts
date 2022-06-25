import { Event } from "@domain/events/event.entity";
import { EventType } from "@domain/events/event-type.entity";
import { NotifyEvent } from "@application/use-cases/notify-event";

export class CreateEvent {

    constructor(private eventType: EventType) {}
    // Criar o evento e notificar os notficadores
    exec() : Event {
        const event = new Event(this.eventType);        
        const notifyEvent = new NotifyEvent(event);
        for (const notifier of this.eventType.notifiers) {
            notifyEvent.exec(notifier);
        }
        return event;
    }
}