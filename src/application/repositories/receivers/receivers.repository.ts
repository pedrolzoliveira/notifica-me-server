import { CreateReceiver } from "@application/dtos/create-receiver.dto";
import { RegisterEventCustomer } from "@application/dtos/register-event-customer.dto";
import { Receiver } from "@domain/receiver.model";

export interface ReceiversRepository {
    getByEvent(type: string) : Promise<Receiver[]>;
    findAll(): Promise<Receiver[]>;
    create(data: CreateReceiver): Promise<Receiver>;
    registerEvent(data: RegisterEventCustomer): Promise<void>;
}



    
    
