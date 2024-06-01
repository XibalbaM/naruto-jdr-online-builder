import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import CharacterService from "../services/character.service";
import StateService from "../services/state.service";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("fiche-personnage")
        .setDescription("Donne les caractéristiques d'un personnage."),
    async execute(interaction) {
        if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
        }
        if (!StateService.getSelectedCharacter(interaction.user.id)) {
            return await Responses.error(interaction, Messages.CHARACTER.NO_SELECTED_CHARACTER);
        }
        await Responses.success(interaction, Messages.CHARACTER.CHARACTER_INFO(await CharacterService.getCharacter(StateService.getSelectedCharacter(interaction.user.id)!, interaction.user.id)));
    }
};

export default command;