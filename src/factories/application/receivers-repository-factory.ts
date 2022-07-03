import { PrismaClient } from "@prisma/client";
import { ReceiversRepository } from "@application/repositories/receivers/receivers.repository";
import { ReceiversPrismaRepository } from "@application/repositories/receivers/receivers-prisma.repository";
import { ReceiversMockRepository } from "@application/repositories/receivers/receivers-mock.repository";
import { Factory } from "@interfaces/factory";

import { FactoryError } from "@errors/factory-error";

type Repo = "prisma" | "mock"

export class ReceiversRepositoryFactory implements Factory<ReceiversRepository> {
    create(repo: Repo = "prisma") : ReceiversRepository {
        try {
            switch(repo) {
                case "prisma": {
                    const prisma = new PrismaClient();
                    return new ReceiversPrismaRepository(prisma);
                }
                case "mock": {
                    return new ReceiversMockRepository();
                }
            }
        } catch(error) {
            throw new FactoryError(ReceiversRepositoryFactory, error);
        }
    }
}