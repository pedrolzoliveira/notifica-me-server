import { FactoryError } from '@errors/factory-error'
import { PlansServiceFactory } from '@factories/application/plans-service-factory'
import { PlansController } from '@infra/http/express/controllers/plans.controller'
import { Factory } from '@interfaces/factory'

export class PlansControllerFactory implements Factory<PlansController> {
  create(): PlansController {
    try {
      return new PlansController(
        new PlansServiceFactory().create()
      )
    } catch (error) {
      throw new FactoryError(PlansControllerFactory, error)
    }
  }
}
