import { Factory } from "@interfaces/factory"
import { AdminService } from "@application/services/admin.service"
import { FactoryError } from "@errors/factory-error"
import { AuthServiceFactory } from "./auth-service-factory"
import { PrismaClient } from "@prisma/client"

export class AdminServiceFactory implements Factory<AdminService> {
    create(): AdminService {
        try {
            return new AdminService(new PrismaClient());
        } catch(error) {
            throw new FactoryError(AuthServiceFactory, error);
        }
    }
}