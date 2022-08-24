import { ReceiversService } from "@application/services/receivers.service";
import { BadRequestError } from "@infra/http/errors/bad-request-error";
import { body } from "express-validator";
import { AuthMiddlaware } from "../middlawares/auth-middlaware";
import { ThrowValidationError } from "../middlawares/throw-validation-error";
import { Controller } from "./controller";

export class ReceiversController extends Controller {
    constructor(
        private receiversService: ReceiversService
    ) {
        super({
            route: "receivers",
            middlewares: [
                AuthMiddlaware
            ],
            handlers: [
                {
                    method: "get",
                    middlawares: [
                        AuthMiddlaware
                    ],
                    handlerFunction: async (req, res) => {
                        const receivers = await this.receiversService.findAll(req.session.customer.id);
                        return res.status(200).send({ receivers });
                    }
                },
                {
                    method: "post",
                    middlawares: [
                        body("number").isString().isLength({ min: 8 }),
                        body("name").isString().isLength({ min: 3 }),
                        body("messenger").isString().isIn(["whatsapp", "telegram", "sms"]),
                        ThrowValidationError,
                        AuthMiddlaware,
                    ],
                    handlerFunction: async (req, res) => {
                        if (["telegram", "sms"].includes(req.body.messenger)) {
                            throw new BadRequestError("serviço não implementado.")
                        }
                        const data = {
                            customerId: req.session.customer.id,
                            number: req.body.number,
                            name: req.body.name,
                            messenger: req.body.messenger,
                        };
                        const receiver = await this.receiversService.create(data);
                        return res.status(201).send({ receiver });
                    }
                },
                {
                    method: "put",
                    middlawares: [
                        body("id").isString(),
                        body("name").isString().isLength({ min: 3 }),
                        body("registeredEvents").isArray(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        const receiver = await this.receiversService.update(req.body);
                        return res.status(201).send({ receiver });
                    }
                },,
                {
                    method: "delete",
                    middlawares: [
                        body("id").isString(),
                        ThrowValidationError,
                        AuthMiddlaware,
                    ],
                    handlerFunction: async (req, res) => {
                        await this.receiversService.delete(req.body.id);
                        return res.status(200).send();
                    }
                },
                {
                    method: "post",
                    name: "register-event",
                    middlawares: [
                        body("eventCode").isString(),
                        body("receiverId").isString(),
                        ThrowValidationError,
                        AuthMiddlaware,
                    ],
                    handlerFunction: async (req, res) => {
                        await this.receiversService.registerEvent(req.body);
                        return res.status(201).send();
                    }
                }
            ]
        })
    }


}