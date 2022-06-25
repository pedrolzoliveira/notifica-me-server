import { Event } from "@domain/event.model";
import { NotifyReceivers } from "@application/use-cases/notify-receivers";



export class CreateEvent {
    
    async exec({
        message,
        type
    } : {
        message: string;
        type: string
    }) {
        const event : Event = {
            type,
            createdAt: new Date()
        };
        
    }
}