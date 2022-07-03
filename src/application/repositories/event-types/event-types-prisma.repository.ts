import { CreateEventType } from "@application/dtos/create-event-type.dto";
import { EventType } from "@domain/event-type.model";
import { PrismaClient } from "@prisma/client";
import { EventTypesRepository } from "./event-types.repository";

export class EventTypesPrismaRepository implements EventTypesRepository {

    constructor(private prisma: PrismaClient) {}

    async create(data: CreateEventType): Promise<EventType> {
        const eventType = await this.prisma.eventType.create({ data });
        return eventType;
    }

    async findByCode(code: string): Promise<EventType> {
        const eventType = await this.prisma.eventType.findUnique({ where: { code } });
        return eventType;
    }

    async findAll(): Promise<EventType[]> {
        const eventTypes = await this.prisma.eventType.findMany();
        return eventTypes;
    }
}