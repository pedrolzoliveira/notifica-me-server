import { Receiver } from "@domain/receiver.model";

export interface ReceiversRepository {
    getByEvent(type: string) : Promise<Receiver[]>
}



    
    
