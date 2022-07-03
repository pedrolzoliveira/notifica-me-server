import { Express, Request, Response, Router, RequestHandler } from "express";

import { CreateEventType } from "@application/use-cases/create-event-type";
import { EventTypesService } from "@application/services/event-types.service";

import { Controller } from "./controller";

export class EventTypesController extends Controller {

    constructor(
        private createEventType: CreateEventType,
        private eventTypesService: EventTypesService
    ) {
        super({
            route: "event-types",
            handlers: [
                {
                    method: "get",
                    handlerFunction: () => {}
                }
            ]
        });
    }
    
}
