import {Client, Collection, GatewayIntentBits, PermissionFlagsBits} from "discord.js";
import {glob} from "glob";

import {SlashCommand} from "./classes";
import config from "./config/env.js";
import express from "express";

const client = new Client({
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

const app = express();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(3000, () => {
    console.log("Listening on port 3000");
});