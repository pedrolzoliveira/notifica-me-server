import { Receiver } from "@domain/receiver.model";
import { ReceiverRepository } from "./receiver.repository";

import { PrismaClient } from "@prisma/client";

export class ReceiverPrismaRepository implements ReceiverRepository {

    constructor(private prisma: PrismaClient) {}

    async getByEvent(type: string): Promise<Receiver[]> {
        const receivers = await this.prisma.receiver.findMany({
            where: {
                registeredEvents: {
                    every: {
                        type
                    }
                }
            }
        });
        return receivers;
    }
}