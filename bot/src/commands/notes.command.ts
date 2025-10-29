import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("notes")
        .setDescription("Donne les notes d'un personnage."),
    async execute(interaction) {
        if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
        }
        if (!StateService.getSelectedCharacter(interaction.user.id)) {
            return await Responses.error(interaction, Messages.CHARACTER.NO_SELECTED_CHARACTER);
        }
        let text = Messages.CHARACTER.NOTES(StateService.getSelectedCharacter(interaction.user.id)!);
        await Responses.success(interaction, text, true, text);
    }
};

export default command;