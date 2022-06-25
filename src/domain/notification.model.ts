import { Receiver } from "./receiver.model";
import { Event } from "./event.model";

export type Notification = {
    event: Event;
    receiver: Receiver;
    createdAt: Date;
}