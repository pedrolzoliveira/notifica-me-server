import { Notifier } from "@domain/notifiers/notifier.entity";

export class EventType {
    constructor(private name: string, private description: string, public notifiers: Notifier[]) {}

}