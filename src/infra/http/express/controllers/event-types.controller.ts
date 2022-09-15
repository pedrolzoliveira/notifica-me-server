import { EventTypesService } from '@application/services/event-types.service'
import { ForbiddenError } from '@infra/http/errors/forbidden-error'
import { ThrowValidationError } from '@infra/http/express/middlawares/throw-validation-error'
import { body } from 'express-validator'
import { AuthMiddlaware } from '../middlawares/auth-middlaware'
import { Controller } from './controller'

export class EventTypesController extends Controller {
  constructor(
    private readonly eventTypesService: EventTypesService
  ) {
    super({
      route: 'event-types',
      handlers: [
        {
          method: 'post',
          middlawares: [
            AuthMiddlaware('admin'),
            body('code').isString().isLength({ min: 3 }),
            body('name').isString().isLength({ min: 5 }),
            body('description').isString().optional(),
            ThrowValidationError
          ],
          handlerFunction: async (req, res) => {
            const data = {
              adminId: req.session.admin.id,
              code: req.body.code,
              name: req.body.name,
              description: req.body.description
            }
            const eventType = await this.eventTypesService.create(data)
            return res.status(201).send({ eventType })
          }
        },
        {
          method: 'get',
          handlerFunction: async (req, res) => {
            const code = req.query.code as string
            if (code) {
              const eventType = await this.eventTypesService.findByCode(code)
              return res.status(200).send({ eventType })
            }
            const eventTypes = await this.eventTypesService.findAll()
            return res.status(200).send({ eventTypes })
          }
        },
        {
          method: 'put',
          middlawares: [
            AuthMiddlaware('admin'),
            body('code').isString(),
            body('name').isString().optional(),
            body('description').isString().optional(),
            ThrowValidationError,
            async (req, res, next) => {
              const hasPermission = await this.eventTypesService.hasPermission({ code: req.body.code, adminId: req.session.admin.id })
              if (!hasPermission) {
                throw new ForbiddenError('Voce não tem permissao')
              }
              next()
            }
          ],
          handlerFunction: async (req, res) => {
            const eventType = await this.eventTypesService.update(req.body)
            return res.status(200).send({ eventType })
          }
        },
        {
          method: 'delete',
          middlawares: [
            AuthMiddlaware('admin'),
            body('code').isString(),
            ThrowValidationError,
            async (req, res, next) => {
              const hasPermission = await this.eventTypesService.hasPermission({ code: req.body.code, adminId: req.session.admin.id })
              if (!hasPermission) {
                throw new ForbiddenError('Voce não tem permissao')
              }
              next()
            }
          ],
          handlerFunction: async (req, res) => {
            await this.eventTypesService.delete(req.body.code)
            return res.status(200).send()
          }
        }
      ]
    })
  }
}
