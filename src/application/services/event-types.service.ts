import { CreateEventType } from "@application/dtos/create-event-type.dto";
import { UpdateEventType } from "@application/dtos/update-event-type.dto";
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

    update(data: UpdateEventType) {
        return this.eventTypesRepository.update(data);
    }

    delete(code: string) {
        return this.eventTypesRepository.delete(code);
    }

}