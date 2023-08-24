import ImageSourceConfig from "./ImageSourceConfig.js";
import {REST} from "@discordjs/rest";

export default class Environment {
    /**
     * The environment name
     */
    env: string;
    /**
     * The host to listen on.
     */
    host: string;
    /**
     * The port to listen on.
     */
    port: number;
    /**
     * The protocol to use (used only in tests).
     */
    protocol: "http" | "https";
    /**
     * The key for https.
     */
    httpsKey?: string;
    /**
     * The cert for https.
     */
    httpsCert?: string;
    /**
     * The database connection string.
     */
    db: string;
    /**
     * The database name to connect to from the connection string.
     */
    dbName: string;
    /**
     * The secret to use for JWT tokens.
     */
    jwt_secret: string;
    /**
     * The expiration time for JWT tokens.
     */
    jwt_expiration: number;
    /**
     * The secret to use for JWT tokens for login.
     */
    login_jwt_secret: string;
    /**
     * The expiration time for JWT tokens for login.
     */
    login_jwt_expiration: number;
    /**
     * The email configuration for sending emails.
     */
    loginEmail: {
        /**
         * The transport to use for sending emails (contains the auth information).
         */
        transport: any;
        /**
         * The username to use for sending emails.
         */
        username: string;
    }
    /**
     * The URL sent in the connection/creation email.
     */
    loginUrl: string;
    /**
     * The list of allowed image hosts.
     */
    imageSource: ImageSourceConfig[];
    /**
     * The list of allowed image extensions.
     */
    allowedFileExtensions: string[];

    /**
     * The secret key for reCaptcha.
     */
    reCaptchaSecretKey: string;

    /**
     * The datas for discord.
     */
    discord: {
        /**
         * The client id of the discord application.
         */
        clientId: string;
        /**
         * The client secret of the discord application.
         */
        clientSecret: string;
        /**
         * The redirect uri of the oauth2.
         */
        redirectUri: string;
        /**
         * The bot token of the discord application.
         */
        botToken: string;
        /**
         * The rest client for discord.
         */
        rest: REST;
        /**
         * The guild id of the discord application.
         */
        guildId: string;
    }
};