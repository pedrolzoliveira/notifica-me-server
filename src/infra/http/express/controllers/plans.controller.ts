import { PlansService } from "@application/services/plans.service";
import { body, query } from "express-validator";
import { ThrowValidationError } from "../middlawares/throw-validation-error";
import { Controller } from "./controller";


export class PlansController extends Controller {
    constructor(
        private plansService: PlansService
    ) {
        super({
            route: "plans",
            handlers: [
                {
                    method: "get",
                    middlawares: [
                        query("id").isString().optional(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        if (req.query.id) {
                            const plan = await this.plansService.find(req.query.id as string);
                            return res.status(200).send({ plan })
                        }
                        const plans = await this.plansService.findAll();
                        return res.status(200).send({ plans });
                    }
                },
                {
                    method: "post",
                    middlawares: [
                        body("name").isString(),
                        body("description").isString(),
                        body("price").isInt(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        const plan = await this.plansService.create(req.body);
                        return res.status(201).send({ plan });
                    }
                },
                {
                    method: "delete",
                    middlawares: [
                        body("id").isString(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        await this.plansService.delete(req.body.id);
                        return res.status(200).send();
                    }
                },
                {
                    method: "put",
                    middlawares: [
                        body("id").isString(),
                        body("name").isString().optional(),
                        body("description").isString().optional(),
                        body("price").isInt().optional(),
                        ThrowValidationError
                    ],
                    handlerFunction: async (req, res) => {
                        const plan = await this.plansService.update(req.body);
                        return res.status(200).send({ plan });
                    }
                }
            ]
        })
    }
}