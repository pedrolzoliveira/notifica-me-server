import { CreateEvent } from "@application/dtos/create-event.dto";
import { Event } from "@domain/event.model";


export interface EventsRepository {
    create(data: CreateEvent): Promise<Event>;
    findAll(): Promise<Event[]>;
}