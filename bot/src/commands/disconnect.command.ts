import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("déconnexion")
        .setDescription("Permet de déconnecter son compte discord de son compte en ligne"),
    async execute(interaction) {
        /*if (await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            if (await AuthService.unlinkDiscordAccount(interaction.user.id)) {
                await Responses.success(interaction, Messages.LINKING.UNLINKED);
            } else {
                await Responses.error(interaction, Messages.LINKING.UNLINK_FAILED);
            }
        } else {
            await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
        }*/
        await Responses.error(interaction, Messages.ERRORS.NOT_IMPLEMENTED);
    },
    implemented: false
}

export default command;