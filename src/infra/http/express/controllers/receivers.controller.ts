import { ReceiversService } from "@application/services/receivers.service";
import { body } from "express-validator";
import { ThrowValidationError } from "../middlawares/throw-validation-error";
import { Controller } from "./controller";

export class ReceiversController extends Controller {
    constructor(
        private receiversService: ReceiversService
    ) {
        super({
            route: "receivers",
            handlers: [
                {
                    method: "post",
                    middlawares: [
                        body("customerId").isString(),
                        body("number").isString(),
                        body("messenger").isString().isIn(["whatsapp", "telegram", "sms"]),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        const receiver = await this.receiversService.create(req.body);
                        return res.status(201).send({ receiver });
                    }
                },
                {
                    method: "post",
                    name: "register-event",
                    middlawares: [
                        body("eventCode").isString(),
                        body("receiverId").isString(),
                        ThrowValidationError
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