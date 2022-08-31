import { EventsRepository } from "@application/repositories/events/events.repository";
import { Publisher } from "@infra/mqtt/publisher";
class ExecDTO {
    text: string;
    code: string;
}

export class CreateEvent {

    constructor(
        private eventsRepository: EventsRepository,
        private publisher: Publisher,
    ) {}

    async exec(data: ExecDTO) {
        const event = await this.eventsRepository.create({ ...data });
        await this.publisher.publish(event);
        return event;
    }
}
