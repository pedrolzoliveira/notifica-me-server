import { body } from "express-validator";
import { CredentialsService } from "@application/services/credentials.service";
import { ThrowValidationError } from "@infra/http/express/middlawares/throw-validation-error";
import { Controller } from "./controller";

export class CrendetialsController extends Controller {
    constructor(
        private credentialsService: CredentialsService
    ) {
        super({
            route: "credentials",
            handlers: [
               {
                method: "post",
                middlawares: [
                    body("name").isString(),
                    body("code").isString(),
                    ThrowValidationError
                ],
                handlerFunction: async (req, res) => {
                    const credential = await this.credentialsService.create(req.body);
                    return res.status(201).send({ credential });
                }
               },
               {
                method: "get",
                handlerFunction: async (req, res) => {
                    const credentials = await this.credentialsService.findAll();
                    return res.status(200).send({ credentials });
                }
               }
            ]
        })
    }
}
