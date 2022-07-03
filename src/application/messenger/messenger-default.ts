import { Twilio } from "twilio";
import { MessengerType } from "@domain/receiver.model"; 

import { Messenger } from "./messenger";

export class MessengerDefault implements Messenger {

    constructor(private twilioClient: Twilio) {}


    async sendMessage({
        by, number, message 
    } : {
        by: MessengerType, number: string, message: string
    }) {
        switch (by) {
            case "whatsapp": {
                await this.twilioClient.messages.create({
                    to: `whatsapp:${number}`,
                    body: message,
                    from: process.env.TWILIO_NUMBER
                })
                break;
            }
            default: {
                console.log(`${by} não implementado`);
                
                break;
            }
                
        }        
    }
}