import { Factory } from '@interfaces/factory'
import { RequestHandler } from 'express'
import { FactoryError } from '@errors/factory-error'
import session from 'express-session'

export class SessionFactory implements Factory<RequestHandler> {
  async create(): Promise<RequestHandler> {
    try {
      return session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: 'auto',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined
        }
      })
    } catch (error) {
      throw new FactoryError(SessionFactory, error)
    }
  }
}
