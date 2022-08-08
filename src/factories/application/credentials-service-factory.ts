import { CredentialsService } from "@application/services/credentials.service";
import { Factory } from "@interfaces/factory";
import { FactoryError } from "@errors/factory-error";
import { CredentialsRepositoryFactory } from "./credentials-repository-factory"


export class CredentialsServiceFactory implements Factory<CredentialsService> {
    create(): CredentialsService {
        try {
            return new CredentialsService(
                new CredentialsRepositoryFactory().create()
            );
        } catch(error) {
            throw new FactoryError(CredentialsServiceFactory, error);
        }
    }
}