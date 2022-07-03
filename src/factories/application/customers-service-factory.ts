import { CustomersService } from "@application/services/customers.service";
import { FactoryError } from "@errors/factory-error";
import { Factory } from "@interfaces/factory";
import { CustomersRepositoryFactory } from "./customers-repository-factory";


export class CustomersServiceFactory implements Factory<CustomersService> {
    create(): CustomersService {
        try {
            return new CustomersService(
                new CustomersRepositoryFactory().create()
            )
        } catch(error) {
            throw new FactoryError(CustomersService, error);
        }
    }
}
