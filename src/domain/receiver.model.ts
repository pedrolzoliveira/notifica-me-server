import { Customer } from "./customer.model";

export type MessengerType = "whatsapp" | "telegram" | "sms";

export type Receiver = {
    id?: string;
    customer?: Customer;
    name: string;
    registeredEvents?: any[];
    number: string;
    messenger: MessengerType;
}