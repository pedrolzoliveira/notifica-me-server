import { Customer } from "./customer.model";

export type MessengerType = "whatsapp" | "telegram" | "sms";

export type Receiver = {
    id?: string;
    customer?: Customer;
    name: string;
    events?: any[];
    number: string;
    messenger: MessengerType;
}