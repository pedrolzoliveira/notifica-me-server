import express, { Express, json } from "express";

import { Controller } from "@infra/http/express/controllers/controller";
export class Server {

    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(json());
    }

    registerControllers(controllers: Controller[]) {
        controllers.forEach(controller => controller.register(this.app));
    }

    listen(port: number) {
        this.app.listen(port, () => console.log(`listening on ${port}`));
    }
}
