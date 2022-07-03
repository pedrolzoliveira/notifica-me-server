import { ReceiversService } from "@application/services/receivers.service";
import { FactoryError } from "@errors/factory-error";
import { ReceiversServiceFactory } from "@factories/application/receivers-service-factory";
import { ReceiversController } from "@infra/http/express/controllers/receivers.controller";
import { Factory } from "@interfaces/factory";

export class ReceiversControllerFactory implements Factory<ReceiversController> {
    create(): ReceiversController  {
        try {
            return new ReceiversController(
                new ReceiversServiceFactory().create()
            )
        } catch(error) {
            throw new FactoryError(ReceiversControllerFactory, error);
        }
    }
}
