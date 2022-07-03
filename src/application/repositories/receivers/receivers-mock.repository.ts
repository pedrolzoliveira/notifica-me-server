import { Receiver } from "@domain/receiver.model";
import { ReceiversRepository } from "./receivers.repository";

export class ReceiversMockRepository implements ReceiversRepository {
    async getByEvent(type: string): Promise<Receiver[]> {
        return [{
            messenger: "whatsapp",
            number: "551199999999",
        }]
    }
}
