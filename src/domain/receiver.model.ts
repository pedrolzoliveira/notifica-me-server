import { Customer } from "./customer.model";

export type MessengerType = "whatsapp" | "telegram" | "sms";

export type Receiver = {
    id?: string;
    customer?: Customer;
    registeredEvents?: any[];
    number: string;
    messenger: MessengerType;
}