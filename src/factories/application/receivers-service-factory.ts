import { ReceiversService } from "@application/services/receivers.service";
import { FactoryError } from "@errors/factory-error";
import { Factory } from "@interfaces/factory";
import { ReceiversRepositoryFactory } from "./receivers-repository-factory";

export class ReceiversServiceFactory implements Factory<ReceiversService> {
    create(): ReceiversService {
        try {
            return new ReceiversService(
                new ReceiversRepositoryFactory().create()
            )
        } catch(error) {
            throw new FactoryError(ReceiversServiceFactory, error);
        }
        
    }
}
