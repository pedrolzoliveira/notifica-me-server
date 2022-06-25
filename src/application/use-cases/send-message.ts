import { Receiver } from "@domain/receiver.model";

function sendBy(messenger: "whatsapp" | "telegram" | "sms") {
    return {
        send: (body: string, number: string) => {}
    }
}

export class SendMessage {
    constructor(private receiver: Receiver) {}

    exec(message: string) {
        sendBy(this.receiver.messenger).send(message, this.receiver.number)
    }

}