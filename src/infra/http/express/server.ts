import 'express-async-errors'
import express, { Express, json } from 'express'
import { Controller } from '@infra/http/express/controllers/controller'
import { ErrorHandler } from '@infra/http/express/middlawares/error-handler'
import cors from 'cors'
export class Server {
  private readonly app: Express

  constructor(
    session: express.RequestHandler
  ) {
    this.app = express()
    this.app.use(json())
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
    }))
    this.app.use(session)
  }

  registerControllers(controllers: Controller[]) {
    controllers.forEach(controller => controller.register(this.app))

    this.app.use(ErrorHandler)
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`listening on ${port}`))
  }
}
