import { Consumer } from './consumer'

export class Listener {
  private consumer: Consumer

  async init() {
    this.consumer = new Consumer('event-created', (msg) => {
      const contentString = msg.content.toString()
      const obj = JSON.parse(contentString)
    })
    await this.consumer.init()
  }

  async listen() {
    return await this.consumer.start()
  }
}
