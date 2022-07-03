import { NotifyReceiversFactory } from "../factories/notify-receivers-factory";
import { NotifyReceivers } from "../application/use-cases/notify-receivers";

describe('notify receivers', () => {
    it('should notify the receivers', () => {
        const notifyReceivers : NotifyReceivers = new NotifyReceiversFactory().create();

        

    })
})