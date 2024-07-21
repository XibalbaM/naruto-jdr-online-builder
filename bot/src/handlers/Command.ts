import {Client, REST, Routes, SlashCommandBuilder} from "discord.js";
import {glob} from "glob";

import {SlashCommand} from "../classes.js";
import config from "../config/env.js";

export default async function (client: Client) {
    const slashCommands: SlashCommandBuilder[] = [];

    for (const file of glob.sync("**/*.+(ts|js)", {cwd: "./commands"})) {
        const command: SlashCommand = (await import(`../commands/${file}`)).default;
        slashCommands.push(command.command as SlashCommandBuilder);
        client.slashCommands.set(command.command.name, command);
        console.log(`Found slash command ${command.command.name}`);
    }

    console.log(`Found ${slashCommands.length} slash command(s)`);

    const rest = new REST({version: "10"}).setToken(config.token);

    try {
        const response: any = await rest.put(Routes.applicationCommands(config.clientId), {
            body: slashCommands.map(command => command.toJSON()),
        })

        console.log(`Successfully loaded ${response.length} slash command(s)`);
    } catch (error) {
        console.error(error);
    }
};