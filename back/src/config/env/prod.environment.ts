import Environment from "./Environment.js";

export default new Environment({
    env: 'prod',
    host: '127.0.0.1',
    port: 80,
    protocol: process.env.PROTOCOL,
    httpsKey: process.env.HTTPS_KEY,
    httpsCert: process.env.HTTPS_CERT,
    db: process.env.MONGO_URL,
    dbName: process.env.MONGO_DB_NAME,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiration: 259200,
    login_jwt_secret: process.env.LOGIN_JWT_SECRET,
    login_jwt_expiration: 300,
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
            }
        },
        username: process.env.EMAIL_USERNAME,
    },
    loginUrl: `https://${process.env.SERVER_ADRESS}/connexion/`,
    reCaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    discord: {
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        redirectUri: `https://${process.env.SERVER_ADRESS}/compte/discord`,
        botToken: process.env.DISCORD_BOT_TOKEN,
        guildId: process.env.DISCORD_GUILD_ID,
    }
} as Environment);