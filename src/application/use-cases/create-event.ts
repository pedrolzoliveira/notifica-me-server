import { NotifyReceivers } from "@application/use-cases/notify-receivers";
import { EventsRepository } from "@application/repositories/events/events.repository";


export class CreateEvent {
    
    constructor(
        private notifyReceivers: NotifyReceivers,
        private eventsRepository: EventsRepository
    ) {}

    async exec({
        text,
        code
    } : {
        text: string;
        code: string
    }) {
        const event = await this.eventsRepository.create({ code, text });
        await this.notifyReceivers.exec({ event, text });
        return event;
    }
}