import "dotenv/config";

import { UndefinedEnvError } from "@errors/undefined-env-error";

const neededEnvVariables = [
    "DATABASE_URL",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_NUMBER",
    "DATABASE_URL",
    "PORT"
];

const missingEnv = [];

neededEnvVariables.forEach(env => {
    if (process.env[env] == undefined) missingEnv.push(env);
});

if (missingEnv.length > 0) throw new UndefinedEnvError(missingEnv);