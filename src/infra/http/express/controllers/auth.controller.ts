import { AuthService } from "@application/services/auth.service";
import { CustomersService } from "@application/services/customers.service";
import { body } from "express-validator";
import { ThrowValidationError } from "../middlawares/throw-validation-error";
import { Controller } from "./controller";

export class AuthController extends Controller {
   constructor(
    private authService: AuthService,
   ) {
    super({
        route: "auth",
        handlers: [
            {
                method: "post",
                name: "signup",
                middlawares: [
                    body("email").isString().isEmail(),
                    body("password").isString().isStrongPassword(),
                    body("name").isString(),
                    ThrowValidationError

                ],
                handlerFunction: async (req, res) => {
                    const customer = await this.authService.signUp(req.body);
                    return res.status(201).send({ customer });
                }
            },
            {
                method: "post",
                name: "singin",
                middlawares: [
                    body("email").isString(),
                    body("password").isString(),
                    ThrowValidationError
                ],
                handlerFunction: async (req, res) => {
                    const customer = await this.authService.signIn(req.body);
                    return res.status(200).send({ customer });
                }
            }
        ]
    })
   }
}