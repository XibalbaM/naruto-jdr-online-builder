import {AutocompleteInteraction, ChatInputCommandInteraction, Collection, SlashCommandBuilder} from "discord.js";

export interface SlashCommand {
    command: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup" | "addBooleanOption" | "addUserOption" | "addChannelOption" | "addRoleOption" | "addAttachmentOption" | "addMentionableOption" | "addStringOption" | "addIntegerOption" | "addNumberOption">,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void,
    autocomplete?: (interaction: AutocompleteInteraction) => void
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