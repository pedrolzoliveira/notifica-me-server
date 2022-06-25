import { Customer } from "./customer.model";

export type MessengerType = "whatsapp" | "telegram" | "sms";

export type Receiver = {
    id?: string;
    customer?: Customer;
    registeredEvents?: string[];
    number: string;
    messenger: MessengerType;
}