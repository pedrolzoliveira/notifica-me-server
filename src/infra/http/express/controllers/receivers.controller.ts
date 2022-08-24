import { ReceiversService } from "@application/services/receivers.service";
import { BadRequestError } from "@infra/http/errors/bad-request-error";
import { ForbiddenError } from "@infra/http/errors/forbidden-error";
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
                        body("events").isArray(),
                        ThrowValidationError,
                        async (req, res, next) => {
                            const hasPermission = await this.receiversService.hasPermission({
                                id: req.body.id,
                                customerId: req.session.customer.id,
                            });
                            if (!hasPermission) {
                                throw new ForbiddenError('Você não tem acesso a este recebedor');
                            }
                            next();
                        }
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
                        async (req, res, next) => {
                            const hasPermission = await this.receiversService.hasPermission({
                                id: req.body.id,
                                customerId: req.session.customer.id,
                            });
                            if (!hasPermission) {
                                throw new ForbiddenError('Você não tem acesso a este recebedor');
                            }
                            next();
                        }
                    ],
                    handlerFunction: async (req, res) => {
                        await this.receiversService.delete(req.body.id);
                        return res.status(200).send();
                    }
                }
            ]
        })
    }


}