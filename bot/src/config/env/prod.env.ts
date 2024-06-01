import Environment from "./Environment.js";

export default {
    env: "prod",
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    api_url: "https://ninjadex.naruto-jdr.com/api/discord",
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiration: 60,
} as Environment;