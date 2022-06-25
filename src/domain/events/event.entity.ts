import { EventType } from "./event-type.entity";

export class Event {

    public createdAt: Date;

    constructor (public type: EventType) {
        this.createdAt = new Date();
    }
}