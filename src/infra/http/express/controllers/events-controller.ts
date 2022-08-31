import { body, query } from "express-validator";
import { ThrowValidationError } from "@infra/http/express/middlawares/throw-validation-error";
import { EventsService } from "@application/services/events.service";
import { Controller } from "./controller";
import { ForbiddenError } from "@infra/http/errors/forbidden-error";
import { CreateEvent } from "@application/use-cases/create-event";

export class EventsController extends Controller {
	constructor(
		private eventsService: EventsService,
		private createEvent: CreateEvent,
	) {
		super({
			route: "events",
			handlers: [
				{
					method: "post",
					middlawares: [
						body("text").isString(),
						ThrowValidationError,
					],
					handlerFunction: async (req, res) => {
						console.log(req.headers.authorization)
						const credential = await this.eventsService.getCredential(req.headers.authorization.split(' ')[1]);
						if (!credential) throw new ForbiddenError('sem acesso!');

						const event = await this.createEvent.exec({
							code: credential.eventCode,
							text: req.body.text,
						});
						return res.status(201).send({ event });
					},
				},
				{
					method: "get",
					middlawares: [
						query("code").isString().optional(),
						query("skip").isNumeric().optional(),
						ThrowValidationError,
					],
					handlerFunction: async (req, res) => {
						const events = await this.eventsService.findAll({
							code: req.query.code as string,
							skip: Number(req.query.skip || 20),
						});
						return res.status(200).send({ events });
					},
				},
			],
		});
	}
}
