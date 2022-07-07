import { EventsRepository } from "@application/repositories/events/events.repository";
import { CreateEvent } from "@application/use-cases/create-event";
import { CreateEvent as CreateEventDTO } from "@application/dtos/create-event.dto";

export class EventsService {
    constructor(
        private eventsRepository: EventsRepository,
        private createEvent: CreateEvent
    ) {}

    async create(data: CreateEventDTO) {
        const event = await this.createEvent.exec(data)
        return event;
    }

    async findAll(code?: string) {
        const events = await this.eventsRepository.findAll(code);
        return events;
    }
}