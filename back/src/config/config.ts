import Environment from "./env/Environment.js";
import {configDotenv} from "dotenv";
import fs from "fs";
import {REST} from "@discordjs/rest";

//Get the environment to use
const env = process.env.NODE_ENV || 'test';
console.log(`Loading ${env} environment...`);

//Load the environment
let importPath = env === 'prod' ? '.env' : `.env.${env}`;
configDotenv({path: importPath});
const config: Environment = {
    env: env,
    host: process.env.HOST,
    port: Number.parseInt(process.env.PORT),
    protocol: process.env.PROTOCOL as 'http' | 'https',
    httpsKey: process.env.HTTPS_KEY ? fs.readFileSync(process.env.HTTPS_KEY).toString() : "",
    httpsCert: process.env.HTTPS_CERT ? fs.readFileSync(process.env.HTTPS_CERT).toString() : "",
    db: process.env.MONGO_URL,
    dbName: process.env.MONGO_DB_NAME,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiration: Number.parseInt(process.env.JWT_EXPIRATION),
    jwt_expiration_in_ms: Number.parseInt(process.env.JWT_EXPIRATION) * 1000,
    login_jwt_secret: process.env.LOGIN_JWT_SECRET,
    login_jwt_expiration: Number.parseInt(process.env.LOGIN_JWT_EXPIRATION),
    loginEmail: {
        transport: {
            host: "smtp.zoho.eu",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
                cert: process.env.EMAIL_CERT ? fs.readFileSync(process.env.EMAIL_CERT).toString() : undefined,
            }
        },
        username: process.env.EMAIL_USERNAME,
    },
    loginUrl: `${process.env.PROTOCOL}://${process.env.SERVER_ADDRESS}/connexion/`,
    reCaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    discord: {
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        redirectUri: `${process.env.PROTOCOL}://${process.env.SERVER_ADDRESS}/compte/discord`,
        botToken: process.env.DISCORD_BOT_TOKEN,
        guildId: process.env.DISCORD_GUILD_ID,
        rest: new REST({version: '10', authPrefix: "Bot"}).setToken(process.env.DISCORD_BOT_TOKEN)
    },
    allowedFileExtensions: ["png", "jpg", "jpeg", "webp", "svg"]
};
console.log(`Loaded ${env} environment`);

export default config;