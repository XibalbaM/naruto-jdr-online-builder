import {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    Collection,
    SlashCommandOptionsOnlyBuilder,
    SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

export interface SlashCommand {
    command: SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    implemented?: boolean
}

export class ButtonStyle {
    static readonly PRIMARY = 1;
    static readonly SECONDARY = 2;
    static readonly SUCCESS = 3;
    static readonly DANGER = 4;
    static readonly LINK = 5;
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args: any) => Promise<void> | void
}

declare module "discord.js" {
    interface Client {
        slashCommands: Collection<string, SlashCommand>;
    }
}