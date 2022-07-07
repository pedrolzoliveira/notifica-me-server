import { body, query } from "express-validator";
import { ThrowValidationError } from "@infra/http/express/middlawares/throw-validation-error";
import { EventsService } from "@application/services/events.service";


import { Controller } from "./controller";

export class EventsController extends Controller {
    constructor(
        private eventsService: EventsService
    ) {
        super({
            route: "events",
            handlers: [
                {
                    method: "post",
                    middlawares: [
                        body("code").isString(),
                        body("text").isString(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        const event = await this.eventsService.create(req.body);
                        return res.status(201).send({ event });
                    }
                },
                {
                    method: "get",
                    middlawares: [
                        query('code').isString().optional(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        const events = await this.eventsService.findAll(req.query.code as string);
                        return res.status(200).send({ events });
                    }
                }
            ]
        })
    }
}