import { MessengerType } from "@domain/receiver.model";
import { Messenger } from "./messenger";


export class MessengerMock implements Messenger {
    async sendMessage({ by, number, message }: { by: MessengerType; number: string; message: string; }): Promise<any> {
        return 'mocked-return';
    }
}