import { AuthController } from "@infra/http/express/controllers/auth.controller";
import { Factory } from "@interfaces/factory";
import { FactoryError } from "@errors/factory-error";
import { AuthServiceFactory } from "@factories/application/auth-service-factory";

export class AuthControllerFactory implements Factory<AuthController> {
    create(): AuthController {
        try {
            return new AuthController(
                new AuthServiceFactory().create(),
            );
        } catch(error) {
            throw new FactoryError(AuthControllerFactory, error);
        }
    }
}
