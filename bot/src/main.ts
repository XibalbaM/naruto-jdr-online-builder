import {Client, Collection, GatewayIntentBits, PermissionFlagsBits} from "discord.js";
import {glob} from "glob";

import {SlashCommand} from "./classes";
import config from "./config/env.js";
import axios from "axios";

const client = new Client({
    presence: {
        status: "online",
        activities: [{
            name: "/aide pour les commandes",
            type: 2,
            url: "https://builder.naruto-jdr.com"
        }]
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
client.slashCommands = new Collection<string, SlashCommand>();

console.log("Running handlers...");
for (const handler of glob.sync("**/*.+(ts|js)", {cwd: "./handlers"})) {
    console.log(`Running handler ${handler}`);
    await (await import(`./handlers/${handler}`)).default(client);
}
console.log("Handlers run finished");

client.login(config.token);

if (config.env === "production" || true) {
    setInterval(() => {
        axios.get("https://uptime.betterstack.com/api/v1/heartbeat/FthAFVsWQzZqhygyscThcXaH")
    }, 1000 * 60 * 2);
}