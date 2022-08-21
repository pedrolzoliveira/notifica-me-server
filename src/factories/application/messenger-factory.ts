import { Messenger } from "@application/messenger/messenger";
import { MessengerDefault } from "@application/messenger/messenger-default";
import { MessengerMock } from "@application/messenger/messenger-mock";
import { TwilioClient } from "@infra/twilio";

import { Factory } from "@interfaces/factory"

import { FactoryError } from "@errors/factory-error";

type Mode = "default" | "mock"

export class MessengerFactory implements Factory<Messenger> {
    create(mode: Mode = "default") : Messenger {
        try {
            switch(mode) {
                case "default": {
                    return new MessengerMock();
                    const twilioClient = new TwilioClient().client;
                    return new MessengerDefault(twilioClient);
                }
                case "mock": {
                    return new MessengerMock();
                }
            }
        } catch(error) {
            throw new FactoryError(MessengerFactory, error);
        }
    }
}