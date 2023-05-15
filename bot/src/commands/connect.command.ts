import {SlashCommandBuilder} from "discord.js";

import * as api from "../utils/api.utils.js"
import {SlashCommand} from "../types";

const command: SlashCommand = {
    command: new SlashCommandBuilder(),
    async execute(interaction) {

    }
};

export default command;