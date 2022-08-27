import { body, query } from "express-validator";
import { ThrowValidationError } from "@infra/http/express/middlawares/throw-validation-error";
import { EventsService } from "@application/services/events.service";
import { Controller } from "./controller";
import { CredentialMiddlaware } from "../middlawares/credentail-middlaware";

export class EventsController extends Controller {
	constructor(
		private eventsService: EventsService,
		private credentialMiddlaware: CredentialMiddlaware,
	) {
		super({
			route: "events",
			handlers: [
				{
					method: "post",
					middlawares: [
						body("code").isString(),
						body("text").isString(),
						ThrowValidationError,
						(() => this.credentialMiddlaware.handler)()
					],
					handlerFunction: async (req, res) => {
						const event = await this.eventsService.create(req.body);
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
