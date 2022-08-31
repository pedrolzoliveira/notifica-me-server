import { FactoryError } from "@errors/factory-error";
import { Publisher } from "@infra/mqtt/publisher";
import { Factory } from "@interfaces/factory";

export class PublisherFactory implements Factory<Publisher> {
    async create(queue: string): Promise<Publisher> {
        try {
            const publisher = new Publisher(queue);
            await publisher.init();
            return publisher;
        } catch(error) {
            throw new FactoryError(PublisherFactory, error);
        }
    }
}
