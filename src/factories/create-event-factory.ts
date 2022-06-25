import { CreateEvent } from "@application/use-cases/create-event";
import { EventType } from "@domain/events/event-type.entity";

export class CreateEventFactory {
    static create(eventType: EventType): CreateEvent {
        return new CreateEvent(eventType);
    }
}