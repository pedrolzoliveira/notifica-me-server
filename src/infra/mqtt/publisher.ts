import amqplib, { Connection, Channel } from "amqplib";

export class Publisher {

    private conn: Connection;
    private channel: Channel;


    constructor (
        private queue: string
    ) {}

    async init() {
        this.conn = await amqplib.connect(process.env.RABBITMQ_URL);
        this.channel = await this.conn.createChannel();
        await this.channel.assertQueue(this.queue);
    }

    async publish(content: Object) {
        const contentString = JSON.stringify(content);
        this.channel.sendToQueue(this.queue, Buffer.from(contentString));
    }
}
