import amqplib, { ConsumeMessage, Connection, Channel } from 'amqplib'

export class Consumer {
  private conn: Connection
  private channel: Channel

  constructor(
    private readonly queue: string,
    private readonly handler: (msg: ConsumeMessage) => void | Promise<void>
  ) {}

  async init() {
    this.conn = await amqplib.connect(process.env.RABBITMQ_URL, { heartbeat: 1 })
    this.channel = await this.conn.createChannel()
    await this.channel.assertQueue(this.queue)
  }

  async start() {
    await this.channel.consume(this.queue, this.handler)
  }

  public ack(msg: ConsumeMessage) {
    this.channel.ack(msg)
  }

  public reject(msg: ConsumeMessage) {
    this.channel.reject(msg)
  }
}
