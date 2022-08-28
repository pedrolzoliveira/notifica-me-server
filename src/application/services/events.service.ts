import { EventsRepository } from "@application/repositories/events/events.repository";
import { CreateEvent } from "@application/use-cases/create-event";
import { CreateEvent as CreateEventDTO } from "@application/dtos/create-event.dto";
import { PrismaClient } from "@prisma/client";

export class EventsService {
    constructor(
        private eventsRepository: EventsRepository,
        private createEvent: CreateEvent,
        private db: PrismaClient
    ) {}

    async create(data: CreateEventDTO) {
        const event = await this.createEvent.exec(data)
        return event;
    }

    async findAll({ code, skip }: { code?: string, skip?: number }) {
        const events = await this.eventsRepository.findAll({
           code, skip 
        });
        return events;
    }

    async validateRequest({ key, code }) {
        const credential = await this.db.credential.findFirst({ select: { eventCode: true }, where: { key } });
        return credential.eventCode === code;
    }

    async getCredential(key: string) {
        return this.db.credential.findFirst({ where: { key } });
    }
}
