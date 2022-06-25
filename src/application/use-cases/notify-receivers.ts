import { ReceiverRepository } from "@application/repositories/receiver.repository";
import { NotificationRepository } from "@application/repositories/notification.repository";
import { Event } from "@domain/event.model";
import { Messenger } from "@application/messenger/messenger";

export class NotifyReceivers {
    constructor(
        private event: Event,
        private messenger: Messenger,
        private receiverRepository: ReceiverRepository,
        private notificationRepository: NotificationRepository
    ) {}

    async exec(message: string) {
        const receivers = await this.receiverRepository.getByEvent(this.event.type);
        await Promise.all([
            receivers.map(async receiver => {
                await this.messenger.sendMessage({
                    by: receiver.messenger,
                    number: receiver.number,
                    message: message
                });
                await this.notificationRepository.create({ event: this.event, receiver: receiver });
            })
        ]);
    }
}