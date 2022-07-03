import "express-async-errors";
import express, { Express, json } from "express";
import { Controller } from "@infra/http/express/controllers/controller";

import { ErrorHandler } from "@infra/http/express/middlawares/error-handler";

export class Server {

    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(json());
    }

    registerControllers(controllers: Controller[]) {
        controllers.forEach(controller => controller.register(this.app));

        this.app.use(ErrorHandler);
    }

    listen(port: number) {
        this.app.listen(port, () => console.log(`listening on ${port}`));
    }
}
