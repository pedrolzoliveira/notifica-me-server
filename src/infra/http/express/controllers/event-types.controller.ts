import { EventTypesService } from "@application/services/event-types.service";
import { ThrowValidationError } from "@infra/http/express/middlawares/throw-validation-error";
import { body } from "express-validator";
import { Controller } from "./controller";

export class EventTypesController extends Controller {

    constructor(
        private eventTypesService: EventTypesService
    ) {
        super({
            route: "event-types",
            handlers: [
                {
                    method: "post",
                    middlawares: [
                        body('code').isString(),
                        body('name').isString(),
                        body('description').isString().optional(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        const eventType = await this.eventTypesService.create(req.body); 
                        return res.status(201).send({ eventType });
                    }
                },
                {
                    method: "get",
                    handlerFunction: async (req, res) => {
                        const code  = req.query.code as string;
                        if (code) {
                            const eventType = await this.eventTypesService.findByCode(code); 
                            return res.status(200).send({ eventType });
                        } 
                        const eventTypes = await this.eventTypesService.findAll();
                        return res.status(200).send({ eventTypes });
                    }
                },
                {
                    method: "put",
                    middlawares: [
                        body('code').isString(),
                        body('name').isString().optional(),
                        body('description').isString().optional(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        const eventType = await this.eventTypesService.update(req.body);
                        return res.status(200).send({ eventType });
                    }
                }
            ]
        });
    }
    
}
