import { AuthService } from '@application/services/auth.service'
import { Factory } from '@interfaces/factory'
import { FactoryError } from '@errors/factory-error'
import { CustomersServiceFactory } from './customers-service-factory'
import { AdminServiceFactory } from './admin-service-factory'

export class AuthServiceFactory implements Factory<AuthService> {
  create(): AuthService {
    try {
      return new AuthService(
        new CustomersServiceFactory().create(),
        new AdminServiceFactory().create()
      )
    } catch (error) {
      throw new FactoryError(AuthServiceFactory, error)
    }
  }
}
