import { NotifyReceivers } from "@application/use-cases/notify-receivers";
import { EventsPrismaRepository } from "@application/repositories/events/events-prisma.repository";


export class CreateEvent {
    
    constructor(
        private notifyReceivers: NotifyReceivers,
        private eventsRepository: EventsPrismaRepository
    ) {}

    async exec({
        message,
        eventCode
    } : {
        message: string;
        eventCode: string
    }) {
        const event = await this.eventsRepository.create({ eventCode });
        await this.notifyReceivers.exec({ event, message });
    }
}