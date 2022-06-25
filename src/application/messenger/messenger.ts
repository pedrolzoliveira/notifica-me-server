import { Twilio } from "twilio";
import { MessengerType } from "@domain/receiver.model"; 



export class Messenger {

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
                    from: "whatsapp:+14155238886"
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