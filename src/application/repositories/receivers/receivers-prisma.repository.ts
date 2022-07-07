import { Receiver } from "@domain/receiver.model";
import { ReceiversRepository } from "./receivers.repository";

import { PrismaClient } from "@prisma/client";
import { CreateReceiver } from "@application/dtos/create-receiver.dto";
import { RegisterEventCustomer } from "@application/dtos/register-event-customer.dto";

export class ReceiversPrismaRepository implements ReceiversRepository {

    constructor(private prisma: PrismaClient) {}

    async getByEvent(type: string): Promise<Receiver[]> {
        const receivers = await this.prisma.receiver.findMany({
            where: {
                registeredEvents: {
                    every: {
                        type: {
                            code: type
                        }
                    }
                }
            }
        });
        return receivers;
    }

    create(data: CreateReceiver): Promise<Receiver> {
        return this.prisma.receiver.create({ data });
    }

    async registerEvent(data: RegisterEventCustomer): Promise<void> {
        await this.prisma.registeredEventsTypes.create({ data });
        return;
    }

    async findAll(): Promise<Receiver[]> {
        return this.prisma.receiver.findMany({
            select: {
                id: true,
                customerId: true,
                number: true,
                messenger: true,
                registeredEvents: true
            }
        });
    }
    
}