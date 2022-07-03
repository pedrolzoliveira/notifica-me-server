import express from "express";
const app = express();

app.use(express.json());



export class Server {

    app: express.Express;

    constructor() {

    }

    listen(port: number) {

    }
}