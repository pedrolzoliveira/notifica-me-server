import { Server } from "@infra/http/express/server";
import { Factory } from "@interfaces/factory";
import { FactoryError } from "@errors/factory-error";

import { EventTypesControllerFactory } from "./event-types-controller-factory";
import { EventsControllerFactory } from "./events-controller-factory";

export class ServerFactory implements Factory<Server> {
    create(): Server {
        try {
            const server = new Server();
            server.registerControllers([
                new EventTypesControllerFactory().create(),
                new EventsControllerFactory().create()
            ]);
            return server;
        } catch(error) {
            throw new FactoryError(ServerFactory, error);
        }
    }
}
