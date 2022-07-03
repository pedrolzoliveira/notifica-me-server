import { Factory } from "@interfaces/factory";
import { FactoryError } from "@errors/factory-error";
import { EventsService } from "@application/services/events.service";
import { EventsRepositoryFactory } from "./events-repository-factory";
import { CreateEventFactory } from "./create-event-repository";


export class EventsServiceFactory implements Factory<EventsService> {
    create(): EventsService {
        try {
            return new EventsService(
                new EventsRepositoryFactory().create(),
                new CreateEventFactory().create()
            )
        } catch(error) {
            throw new FactoryError(EventsServiceFactory, error);
        }
    }
}

