import { CreateEvent } from "../application/use-cases/create-event";
import { EventType } from "../domain/events/event-type.entity";
import { Event } from "../domain/events/event.entity";





describe('CreateEventUseCase', () => {
    it('Should create an event', () => {
        const eventType = new EventType('event-test', 'evento de teste apenas', []);
        const stu = new CreateEvent(eventType);
    
        const event = stu.exec();
        
        expect(event).toBeInstanceOf(Event);
        expect(event.type).toBe(eventType);        
    });
})