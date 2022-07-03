import { Factory } from "@interfaces/factory";
import { FactoryError } from "@errors/factory-error";

import { EventTypesRepository } from "@application/repositories/event-types/event-types.repository";
import { EventTypesPrismaRepository } from "@application/repositories/event-types/event-types-prisma.repository";


import { PrismaClient } from "@prisma/client";

type Repo = "prisma" | "mock";

export class EventTypesRepositoryFactory implements Factory<EventTypesRepository> {
    create(repo: Repo = "prisma"): EventTypesRepository | Promise<EventTypesRepository> {
        try {
            switch(repo) {
                case "prisma": {
                    const prisma = new PrismaClient();
                    return new EventTypesPrismaRepository(prisma);
                }
                case "mock": {
                    throw new Error("mock not implemented");
                }
            }
        } catch(error) {
            throw new FactoryError(EventTypesRepositoryFactory, error);
        }
    }
}