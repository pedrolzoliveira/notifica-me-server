import { CreateEvent } from "@application/dtos/create-event.dto";
import { Event } from "@domain/event.model";
import { EventsRepository } from "./events.repository";

export class EventsMockRepository implements EventsRepository {
    async create(data: CreateEvent): Promise<Event> {
        return {
            eventCode: data.eventCode,
            createdAt: data.createdAt
        }
    }
}