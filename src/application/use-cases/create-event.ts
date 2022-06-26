import { NotifyReceivers } from "@application/use-cases/notify-receivers";
import { EventPrismaRepository } from "@application/repositories/event-prisma.repository";


export class CreateEvent {
    
    constructor(
        private notifyReceivers: NotifyReceivers,
        private eventRepository: EventPrismaRepository
    ) {}

    async exec({
        message,
        type
    } : {
        message: string;
        type: string
    }) {
        const event = await this.eventRepository.create({ type });
        await this.notifyReceivers.exec({ event, message });
    }
}