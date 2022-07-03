import { Receiver } from "@domain/receiver.model";
import { ReceiversRepository } from "./receivers.repository";

import { PrismaClient } from "@prisma/client";

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
}