import { NotifyReceivers } from "@application/use-cases/notify-receivers";
import { Consumer } from "@infra/mqtt/consumer";
import { Event } from "@prisma/client";
export class EventCreatedConsumer {

    private consumer: Consumer;
    
    constructor(
        private notififyReceivers: NotifyReceivers,
    ) {
        this.consumer = new Consumer('event-created', async (msg) => {
            try {
                const data : Event = JSON.parse(msg.content.toString());
                await this.notififyReceivers.exec(data);
                this.consumer.ack(msg);
                console.log('Message received and processed');
            } catch(error) {
                this.consumer.reject(msg);
                console.log('message rejected');
            } 
        });
    }

    async start() {
        await this.consumer.init();
        await this.consumer.start();
    }
}