import { PlansRepository } from "@application/repositories/plans/plans.repository";
import { PlansPrismaRepository } from "@application/repositories/plans/plans-prisma.repository";
import { Factory } from "@interfaces/factory";
import { PrismaClient } from "@prisma/client";
import { FactoryError } from "@errors/factory-error";


export class PlansRepositoryFactory implements Factory<PlansRepository> {
    create(): PlansRepository {
        try {
            const prisma = new PrismaClient();
            return new PlansPrismaRepository(prisma)
        } catch(error) {
            throw new FactoryError(PlansRepositoryFactory, error);
        }
    }
}
