import ImageSourceConfig from "./ImageSourceConfig.js";
import defaultImageSource from "./image-source.js";

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
    imageSource: ImageSourceConfig[] = defaultImageSource;
    allowedFileExtensions: string[] = ["png", "jpg", "jpeg", "webp", "svg"];

    constructor(data: Environment) {
        Object.assign(this, data);
    }
};