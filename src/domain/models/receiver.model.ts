import { Customer } from "./customer.model";

export interface Receiver {
    id?: string;
    customer?: Customer;
    registeredEvents: string[];
    number: string;
    method: string;
}