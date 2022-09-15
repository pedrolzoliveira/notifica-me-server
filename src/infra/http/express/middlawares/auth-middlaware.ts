import { UnauthorizedError } from '@infra/http/errors/unauthorized-error'
import { Request, Response, NextFunction } from 'express'

type AuthType = 'customer' | 'admin'

export function AuthMiddlaware(type: AuthType = 'customer') {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.session[type]) {
      throw new UnauthorizedError(`You need to be logged as ${type} to use this route`)
    }
    next()
  }
}
