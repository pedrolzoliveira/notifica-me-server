import { AuthService } from '@application/services/auth.service'
import { ForbiddenError } from '@infra/http/errors/forbidden-error'
import { NotFoundError } from '@infra/http/errors/not-found-error'
import { body } from 'express-validator'
import { ThrowValidationError } from '../middlawares/throw-validation-error'
import { Controller } from './controller'

export class AuthController extends Controller {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      route: 'auth',
      handlers: [
        {
          method: 'get',
          name: 'info',
          handlerFunction: (req, res) => {
            if (!req.session.admin && !req.session.customer) return res.status(401).send()
            return res.status(200).send({
              admin: req.session.admin,
              customer: req.session.customer
            })
          }
        },
        {
          method: 'post',
          name: 'signup',
          middlawares: [
            body('email').isString().isEmail(),
            body('password').isString().isStrongPassword(),
            body('name').isString(),
            ThrowValidationError

          ],
          handlerFunction: async (req, res) => {
            const customer = await this.authService.signUp(req.body)
            req.session.customer = customer
            return res.status(201).send({ customer })
          }
        },
        {
          method: 'post',
          name: 'signin',
          middlawares: [
            body('email').isString(),
            body('password').isString(),
            ThrowValidationError
          ],
          handlerFunction: async (req, res) => {
            try {
              const customer = await this.authService.signIn(req.body)
              req.session.customer = customer
              return res.status(200).send({ customer })
            } catch (error) {
              if (error.message === 'Customer not found') {
                throw new NotFoundError(error.message)
              } else if (error.message === 'Password is incorrect') {
                throw new ForbiddenError(error.message)
              }
              throw error
            }
          }
        },
        {
          method: 'post',
          name: 'admin/signup',
          middlawares: [
            body('email').isString().isEmail(),
            body('password').isString().isStrongPassword(),
            body('name').isString(),
            ThrowValidationError

          ],
          handlerFunction: async (req, res) => {
            const admin = await this.authService.signUpAdmin(req.body)
            req.session.admin = admin
            return res.status(201).send({ admin })
          }
        },
        {
          method: 'post',
          name: 'admin/signin',
          middlawares: [
            body('email').isString(),
            body('password').isString(),
            ThrowValidationError
          ],
          handlerFunction: async (req, res) => {
            try {
              const admin = await this.authService.signInAdmin(req.body)
              req.session.admin = admin
              return res.status(200).send({ admin })
            } catch (error) {
              if (error.message === 'Admin not found') {
                throw new NotFoundError(error.message)
              } else if (error.message === 'Password is incorrect') {
                throw new ForbiddenError(error.message)
              }
              throw error
            }
          }
        }
      ]
    })
  }
}
