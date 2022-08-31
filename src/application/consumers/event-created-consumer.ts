import { NotifyReceivers } from "@application/use-cases/notify-receivers";
import { Consumer } from "@infra/mqtt/consumer";
import { Event } from "@prisma/client";

export class EventCreatedConsumer {

    private consumer: Consumer;
    
    constructor(
        private notififyReceivers: NotifyReceivers,
    ) {
        this.consumer = new Consumer('event-created', async (msg) => {
            const data : Event = JSON.parse(msg.content.toString());
            await this.notififyReceivers.exec(data);
        });
    }

    async start() {
        await this.consumer.init();
        await this.consumer.start();
    }
}