import { Factory } from "@interfaces/factory";
import { FactoryError } from "@errors/factory-error";
import { EventsController } from "@infra/http/express/controllers/events-controller";
import { EventsServiceFactory } from "@factories/application/events-service-factory";
import { CredentialMiddlawareFactory } from "./credential-middlaware-factory";


export class EventsControllerFactory implements Factory<EventsController> {
    create(): EventsController {
        try {
            return new EventsController(
                new EventsServiceFactory().create(),
            );
        } catch(error) {
            throw new FactoryError(EventsControllerFactory, error);
        }
    }
}
