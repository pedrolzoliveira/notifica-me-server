import { Event } from "@domain/event.model";
import { EventRepository } from "./event.repository";
import { CreateEvent } from "@application/dtos/create-event.dto";
import { PrismaClient } from "@prisma/client";

export class EventPrismaRepository implements EventRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: CreateEvent): Promise<Event> {
        const event = await this.prisma.event.create({ data });
        return event;
    }
}