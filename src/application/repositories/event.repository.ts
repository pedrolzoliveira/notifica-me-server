import { CreateEvent } from "@application/dtos/create-event.dto";
import { Event } from "@domain/event.model";


export interface EventRepository {
    create(data: CreateEvent): Promise<Event>
}