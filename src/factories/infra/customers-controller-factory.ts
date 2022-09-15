import { FactoryError } from '@errors/factory-error'
import { CustomersServiceFactory } from '@factories/application/customers-service-factory'
import { CustomersController } from '@infra/http/express/controllers/customers.controller'
import { Factory } from '@interfaces/factory'

export class CustomersControllerFactory implements Factory<CustomersController> {
  create(): CustomersController {
    try {
      return new CustomersController(
        new CustomersServiceFactory().create()
      )
    } catch (error) {
      throw new FactoryError(CustomersControllerFactory, error)
    }
  }
}
