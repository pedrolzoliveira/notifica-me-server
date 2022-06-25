import { Receiver } from "@domain/receiver.model";

export interface ReceiverRepository {
    getByEvent(type: string) : Promise<Receiver[]>
}



    
    
