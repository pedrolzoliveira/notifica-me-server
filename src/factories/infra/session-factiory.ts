import { Factory } from "@interfaces/factory";
import { RequestHandler } from "express";
import { FactoryError } from "@errors/factory-error";
import session from "express-session";
import { createClient } from "redis";
import connectRedis from "connect-redis";

export class SessionFactory implements Factory<RequestHandler> {
    async create() : Promise<RequestHandler> {
        try {
            // const RedisStore = connectRedis(session);
            // const redisClient = createClient();
            // await redisClient.connect().then(_ => console.log('conectou'));
            return session({
                secret: process.env.SESSION_SECRET,
                saveUninitialized: false,
                resave: false,
                // store: new RedisStore({ client: redisClient }),
            });
        } catch(error) {
            throw new FactoryError(SessionFactory, error);
        }
    }
}