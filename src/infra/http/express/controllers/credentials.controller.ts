import { body } from "express-validator";
import { CredentialsService } from "@application/services/credentials.service";
import { ThrowValidationError } from "@infra/http/express/middlawares/throw-validation-error";
import { Controller } from "./controller";
import { AuthMiddlaware } from "../middlawares/auth-middlaware";
import { ForbiddenError } from "@infra/http/errors/forbidden-error";

export class CrendetialsController extends Controller {
    constructor(
        private credentialsService: CredentialsService
    ) {
        super({
            route: "credentials",
            middlewares: [
                AuthMiddlaware("admin"),
            ],
            handlers: [
               {
                method: "post",
                middlawares: [
                    body("name").isString(),
                    body("code").isString(),
                    ThrowValidationError,
                ],
                handlerFunction: async (req, res) => {
                    const data = {
                        name: req.body.name,
                        code: req.body.code,
                        adminId: req.session.admin.id
                    };
                    const credential = await this.credentialsService.create(data);
                    return res.status(201).send({ credential });
                }
               },
               {
                method: "get",
                handlerFunction: async (req, res) => {
                    const credentials = await this.credentialsService.findAll(req.session.admin.id);
                    return res.status(200).send({ credentials });
                },
               },
               {
                method: "delete",
                middlawares: [
                    body('id').isString(),
                    ThrowValidationError,
                    async (req, res, next) => {
                        const hasPermission = await this.credentialsService.HasPermission({ adminId: req.session.admin.id, id: req.body.id });
                        if (!hasPermission) {
                            throw new ForbiddenError("Voce nao tem permissao");
                        }
                        next();
                    }
                ],
                handlerFunction: async (req, res) => {
                    await this.credentialsService.delete(req.body.id);
                    return res.status(200).send();
                }
               }
            ]
        })
    }
}
