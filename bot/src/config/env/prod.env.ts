import Environment from "./Environment.js";

export default {
    env: "prod",
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    guildId: process.env.DISCORD_GUILD_ID,
    api_url: "http://localhost:3000/api/discord",
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiration: 60,
} as Environment;