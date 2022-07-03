import { MessengerFactory } from "../factories/messenger-factory";
import { Messenger } from "../application/messenger/messenger";

describe('messenger factory', () => {
    it('should be defined', () => {
        const messenger : Messenger = new MessengerFactory().create("mock");
        expect(messenger).toHaveProperty("sendMessage")
        expect(messenger).toBeDefined();
    })
})

describe('messenger', () => {
    it('should call sendMessage method', async () => {
        const messenger : Messenger = new MessengerFactory().create("mock");
        const mockReturn = await messenger.sendMessage({
            by: "whatsapp",
            number: "40028922",
            message: "text_message"
        });
        expect(mockReturn).toBe('mocked-return');
    });

});