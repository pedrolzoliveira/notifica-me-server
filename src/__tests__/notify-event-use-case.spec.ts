import { Notifier } from "../domain/notifiers/notifier.entity";
import { Notified } from "../domain/notifieds/notified.entity";
import { Notification } from "../domain/notifications/notification.entity";
import { EventFactory } from "../factories/event-factory";

import { NotifyEvent } from "../application/use-cases/notify-event";






describe('Notifier', () => {
    it('should notify the notfiers', () => {
        const event = EventFactory.create();
        const notifier = new Notifier();
        const notified = new Notified('' as any, 'test-suit');
        notifier.subscribe(notified);

        const notifyEvent = new NotifyEvent(event);

        const notifications = notifyEvent.exec(notifier);

        expect(notifications).toBeInstanceOf(Array);
        expect(notifications.length).toBeGreaterThan(0);
        expect(notifications[0]).toBeInstanceOf(Notification);

    });
})