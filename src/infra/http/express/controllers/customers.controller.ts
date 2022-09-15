import { CustomersService } from '@application/services/customers.service'
import { Controller } from './controller'

import { ThrowValidationError } from '@infra/http/express/middlawares/throw-validation-error'

import { body } from 'express-validator'

export class CustomersController extends Controller {
  constructor(
    private readonly customersService: CustomersService
  ) {
    super({
      route: 'customers',
      handlers: [
        {
          method: 'post',
          middlawares: [
            body('type').isString().isIn(['individual', 'company']),
            body('document').isString(),
            body('name').isString(),
            ThrowValidationError
          ],
          handlerFunction: async (req, res) => {
            const customer = await this.customersService.create(req.body)
            return res.status(201).send({ customer })
          }
        },
        {
          method: 'get',
          handlerFunction: async (req, res) => {
            const customers = await this.customersService.findAll()
            return res.status(200).send({ customers })
          }
        }
      ]
    })
  }
}
