import "dotenv/config";

import { UndefinedEnvError } from "@errors/UndefinedEnvError";

const neededEnvVariables = [
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "DB_HOST",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_NUMBER"
];

const missingEnv = [];

neededEnvVariables.forEach(env => {
    if (process.env[env] == undefined) missingEnv.push(env);
});

if (missingEnv.length > 0) throw new UndefinedEnvError(missingEnv);