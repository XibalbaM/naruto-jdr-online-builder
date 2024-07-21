import {Events} from "discord.js";
import {BotEvent} from "../classes.js";

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag} ! (https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=274878024704&scope=bot%20applications.commands)`);
    },
};

export default event;