import { Events } from 'discord.js';
import deployCommands from "../deploy-commands.js";

export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}! (https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`);
        deployCommands(client);
    }
};