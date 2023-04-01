import { REST, Routes } from "discord.js";

import config from "./config/env.js";
import CustomClient from "./models/CustomClient.js";

export default async function (client: CustomClient) {

    const rest = new REST({ version: "10" }).setToken(config.token);

    try {
        const commands = [];

        for (const command of client.commands.values()) {
            commands.push(command.command.toJSON());
        }

        const data = await rest.put(
            Routes.applicationGuildCommands(client.user.id, config.devGuildId),
            { body: commands }
        );
    } catch (error) {
        console.error(error);
    }
}