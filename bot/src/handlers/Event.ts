import {Client} from "discord.js";
import {BotEvent} from "../classes";
import {glob} from "glob";

export default async function (client: Client) {

    for (const file of glob.sync("**/*.+(ts|js)", {cwd: "./events"})) {
        const event: BotEvent = (await import(`../events/${file}`)).default;
        event.once ?
            client.once(event.name, (...args) => event.execute(...args))
            :
            client.on(event.name, (...args) => event.execute(...args));
        console.log(`Successfully loaded event "${event.name}"`);
    }
};
