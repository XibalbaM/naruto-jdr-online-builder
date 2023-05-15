import {Client, Collection, GatewayIntentBits, PermissionFlagsBits} from "discord.js";
import {glob} from "glob";

import {SlashCommand} from "./types.js";
import config from "./config/env.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
client.slashCommands = new Collection<string, SlashCommand>();

console.log("Running handlers...");
const handlersDir = "handlers";
for (const handler of glob.sync("**/*", {cwd: "src/handlers"})) {
    console.log(`Running handler ${handler}`);
    await (await import(`./handlers/${handler}`)).default(client);
}
console.log("Handlers run finished");

client.login(config.token);