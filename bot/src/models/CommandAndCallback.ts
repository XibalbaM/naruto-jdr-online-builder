import {Interaction, SlashCommandBuilder} from "discord.js";

export default class CommandAndCallback {
    command: SlashCommandBuilder;
    execute: Function;
    constructor(command: SlashCommandBuilder, execute: Function) {
        this.command = command;
        this.execute = execute;
    }
}