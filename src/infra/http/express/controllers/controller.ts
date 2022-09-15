import { Express, RequestHandler, Router } from 'express'

export interface Handler {
  method: 'get' | 'post' | 'put' | 'delete'
  name?: string
  middlawares?: RequestHandler[]
  handlerFunction: RequestHandler
}

interface ControllerConstructor {
  route: string
  middlewares?: RequestHandler[]
  handlers?: Handler[]
}

export class Controller {
  route: string
  middlewares: RequestHandler[]
  handlers: Handler[]

  constructor({
    route,
    middlewares,
    handlers
  }: ControllerConstructor) {
    this.route = route
    this.middlewares = middlewares || []
    this.handlers = handlers || []
  }

  public register(app: Express) {
    const router = Router()
    this.middlewares.forEach(middleware => {
      router.use(middleware)
    })
    this.handlers.forEach(handler => {
      const middlawares = handler.middlawares || []
      router[handler.method](
                `/${handler.name || ''}`,
                middlawares.map(middleware => middleware),
                handler.handlerFunction
      )
    })
    app.use(`/${this.route}`, router)
  }
}
