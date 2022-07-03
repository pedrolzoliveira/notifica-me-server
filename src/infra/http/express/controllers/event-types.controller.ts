import { Express, Request, Response, Router, RequestHandler } from "express";

import { EventTypesService } from "@application/services/event-types.service";

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
                    handlerFunction: (req, res) => {
                        this.eventTypesService.create(req.body)
                        .then(eventType => {
                            return res.status(201).send({ eventType });
                        })
                        .catch(error => {
                            console.log(error);
                            
                            return res.status(500).send({ error });
                        })
                    }
                },
                {
                    method: "get",
                    handlerFunction: (req, res) => {
                        this.eventTypesService.findAll()
                        .then(eventTypes => {
                            return res.status(200).send({ eventTypes });
                        })
                        .catch(error => {
                            return res.status(500).send({ error });
                        })
                    }
                },
                {
                    method: "get",
                    name: ":code",
                    handlerFunction: (req, res) => {
                        this.eventTypesService.findByCode(req.params.code)
                        .then(eventType => {
                            return res.status(200).send({ eventType }); 
                        })
                        .catch(error => {
                            console.log(error);
                            console.log();
                             req.query
                            return res.status(500).send({ error });
                        });
                    }
                }
            ]
        });
    }
    
}
