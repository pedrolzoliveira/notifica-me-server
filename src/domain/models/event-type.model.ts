import { Notifier } from "@domain/models/notifier.model";

export class EventType {
    constructor(private name: string, private description: string, public notifiers: Notifier[]) {}

}