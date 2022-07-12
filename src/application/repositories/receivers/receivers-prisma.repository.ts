import { Receiver } from "@domain/receiver.model";
import { ReceiversRepository } from "./receivers.repository";

import { PrismaClient } from "@prisma/client";
import { CreateReceiver } from "@application/dtos/create-receiver.dto";
import { RegisterEventCustomer } from "@application/dtos/register-event-customer.dto";
import { UpdateReceiver } from "@application/dtos/update-receiver.dto";

export class ReceiversPrismaRepository implements ReceiversRepository {

    constructor(private prisma: PrismaClient) {}

    async getByEvent(code: string): Promise<Receiver[]> {
        const receivers = await this.prisma.receiver.findMany({
            where: {
                registeredEvents: {
                    some: {
                        eventCode: code
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
                name: true,
                customerId: true,
                number: true,
                messenger: true,
                registeredEvents: true
            }
        });
    }
    

    async delete(id: string): Promise<void> {
        await this.prisma.$transaction([
            this.prisma.registeredEventsTypes.deleteMany({
                where: {
                    receiverId: id
                }
            }),
            this.prisma.receiver.delete({
                where: {
                    id
                }
            })
        ]);
    }

    async update(data: UpdateReceiver): Promise<Receiver> {
        const receiver = await this.prisma.receiver.update({
            select: {
                id: true,
                name: true,
                number: true,
                messenger: true,
                customerId: true,
                registeredEvents: true
            },
            where: { id: data.id },
            data: {
                name: data.name,
                registeredEvents: {
                    deleteMany: {},
                    create: data.registeredEvents.map(event => {
                        return { eventCode: event }
                    })
                }
            }
        });
        return receiver;
    }
}

// data.registeredEvents.map(event => {
//     return { eventCode: event, receiverId: data.id }
// })