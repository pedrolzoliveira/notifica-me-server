import { ReceiversService } from "@application/services/receivers.service";
import { FactoryError } from "@errors/factory-error";
import { Factory } from "@interfaces/factory";
import { ReceiversRepositoryFactory } from "./receivers-repository-factory";
import { PrismaClient } from "@prisma/client";
export class ReceiversServiceFactory implements Factory<ReceiversService> {
    create(): ReceiversService {
        try {
            return new ReceiversService(
                new ReceiversRepositoryFactory().create(),
                new PrismaClient()
            )
        } catch(error) {
            throw new FactoryError(ReceiversServiceFactory, error);
        }
        
    }
}
