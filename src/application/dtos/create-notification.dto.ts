import { Receiver } from "@domain/receiver.model";
import { Event } from "@domain/event.model";

export class CreateNotification {
    event: Event;
    receiver: Receiver
}