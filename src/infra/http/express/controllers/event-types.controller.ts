import { EventTypesService } from "@application/services/event-types.service";

import { Controller } from "./controller";

import { ServerSideError } from "@infra/http/errors/server-side-error";

export class EventTypesController extends Controller {

    constructor(
        private eventTypesService: EventTypesService
    ) {
        super({
            route: "event-types",
            handlers: [
                {
                    method: "post",
                    handlerFunction: (req, res) => {
                        this.eventTypesService.create(req.body)
                        .then(eventType => {
                            return res.status(201).send({ eventType });
                        })
                    }
                },
                {
                    method: "get",
                    handlerFunction: (req, res) => {
                        const code  = req.query.code as string;

                        code ?
                            this.eventTypesService.findByCode(code)
                            .then(eventType => {
                                return res.status(200).send({ eventType });
                            })
                        :
                            this.eventTypesService.findAll()
                            .then(eventTypes => {
                                return res.status(200).send({ eventTypes });
                            })
                    }
                }
            ]
        });
    }
    
}
