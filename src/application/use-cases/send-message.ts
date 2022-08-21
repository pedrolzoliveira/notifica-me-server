import { Receiver } from "@domain/receiver.model";


export class SendMessage {
    constructor(private receiver: Receiver) {}

    exec(message: string) {
    }

}