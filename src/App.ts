import "./utils/load-env";
import { ServerFactory } from "./factories/infra/server-factory";


async function main() {
    const server = new ServerFactory().create();
    server.listen(3041);
}

main();
