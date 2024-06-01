import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("connexion-status")
        .setDescription("Permet de voir si votre compte discord est connecté à votre compte en ligne"),
    async execute(interaction) {
        await Responses.success(interaction, Messages.LINKING.STATUS(await AuthService.isDiscordAccountLinked(interaction.user.id)));
    }
};

export default command;