import { PlansService } from "@application/services/plans.service";
import { FactoryError } from "@errors/factory-error";
import { Factory } from "@interfaces/factory";
import { PlansRepositoryFactory } from "./plans-repository-factory";

export class PlansServiceFactory implements Factory<PlansService> {
    create(): PlansService {
        try {
            return new PlansService(
                new PlansRepositoryFactory().create()
            );
        } catch(error) {
            throw new FactoryError(PlansServiceFactory, error);
        }
    }
}
