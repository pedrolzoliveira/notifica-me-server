import { Event } from "@domain/event.model";
import { EventsRepository } from "./events.repository";
import { CreateEvent } from "@application/dtos/create-event.dto";
import { PrismaClient } from "@prisma/client";

export class EventsPrismaRepository implements EventsRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: CreateEvent): Promise<Event> {
        const event = await this.prisma.event.create({ data });
        return event;
    }
}