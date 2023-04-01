import fs from 'node:fs';
import path from 'node:path';
import {Client, Collection, Events, GatewayIntentBits} from 'discord.js';

import config from "./config/env.js";
import CustomClient from "./models/CustomClient.js";
import CommandAndCallback from "./models/CommandAndCallback.js";
import __dirname from "./utils/__dirname.js";
import EventHandler from "./models/EventHandler.js";

const client = new CustomClient({ intents: GatewayIntentBits.Guilds });

client.commands = new Collection();
client.events = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of commandFiles) {
    const command: CommandAndCallback = (await import(path.join('file://', __dirname, 'commands', file))).default;
    if (command.command && command.execute) {
        client.commands.set(command.command.name, command);
    } else {
        console.error(`Command ${file} is not a valid command.`);
    }
}
for (const file of eventFiles) {
    const event: EventHandler = (await import(path.join('file://', __dirname, 'events', file))).default;
    if (event.name && event.execute) {
        client.events.set(event.name, event);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    } else {
        console.error(`Event ${file} is not a valid event handler.`);
    }
}

client.login(config.token);