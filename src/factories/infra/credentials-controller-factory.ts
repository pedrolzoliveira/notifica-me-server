import { FactoryError } from "@errors/factory-error";
import { CrendetialsController } from "@infra/http/express/controllers/credentials.controller";
import { CredentialsServiceFactory } from "@factories/application/credentials-service-factory";
import { Factory } from "@interfaces/factory";

export class CrendetialsControllerFactory implements Factory<CrendetialsController> {
    create(): CrendetialsController {
        try {
            return new CrendetialsController(
                new CredentialsServiceFactory().create()
            )
        } catch(error) {
            throw new FactoryError(CrendetialsControllerFactory, error);
        }
    }
}
