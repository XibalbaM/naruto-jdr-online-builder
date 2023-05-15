import {AutocompleteInteraction, Collection, CommandInteraction, SlashCommandBuilder} from "discord.js";

export interface SlashCommand {
    command: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void> | void,
    autocomplete?: (interaction: AutocompleteInteraction) => void
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => Promise<void> | void
}

declare module "discord.js" {
    interface Client {
        slashCommands: Collection<string, SlashCommand>;
    }
}