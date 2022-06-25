import { Receiver } from "@domain/models/receiver.model";
import { Event } from "@domain/models/event.model";

export interface Notification {
    event: Event;
    receiver: Receiver;
    createdAt: Date;
}