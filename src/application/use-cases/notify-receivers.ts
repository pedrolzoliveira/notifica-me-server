import { ReceiversRepository } from "@application/repositories/receivers/receivers.repository";
import { NotificationsRepository } from "@application/repositories/notifications/notifications.repository";
import { Messenger } from "@application/messenger/messenger";
import { Event } from "@domain/event.model";

export class NotifyReceivers {
    constructor(
        private messenger: Messenger,
        private receiversRepository: ReceiversRepository,
        private notificationsRepository: NotificationsRepository
    ) {}

    async exec({ event, text } : { event: Event, text: string} ) {
        const receivers = await this.receiversRepository.getByEvent(event.code);
        
        await Promise.all([
            receivers.map(async receiver => {
                await this.messenger.sendMessage({
                    by: receiver.messenger,
                    number: receiver.number,
                    message: text
                });
                await this.notificationsRepository.create({ event, receiver });
            })
        ]);
    }
}