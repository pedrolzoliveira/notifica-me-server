import { ReceiverRepository } from "@application/repositories/receiver.repository";
import { NotificationRepository } from "@application/repositories/notification.repository";
import { Messenger } from "@application/messenger/messenger";
import { Event } from "@domain/event.model";

export class NotifyReceivers {
    constructor(
        private messenger: Messenger,
        private receiverRepository: ReceiverRepository,
        private notificationRepository: NotificationRepository
    ) {}

    async exec({ event, message } : { event: Event, message: string} ) {
        const receivers = await this.receiverRepository.getByEvent(event.type);
        await Promise.all([
            receivers.map(async receiver => {
                await this.messenger.sendMessage({
                    by: receiver.messenger,
                    number: receiver.number,
                    message: message
                });
                await this.notificationRepository.create({ event, receiver });
            })
        ]);
    }
}