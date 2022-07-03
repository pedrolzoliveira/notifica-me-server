import { CreateEventType } from "@application/dtos/create-event-type.dto";
import { EventTypesRepository } from "@application/repositories/event-types/event-types.repository";

export class EventTypesService {
    constructor(
        private eventTypesRepository: EventTypesRepository
    ) {}

    create(data: CreateEventType) {
        return this.eventTypesRepository.create(data);
    }

    findAll() {
        return this.eventTypesRepository.findAll();
    }

    findByCode(code: string) {
        return this.eventTypesRepository.findByCode(code);
    }

}