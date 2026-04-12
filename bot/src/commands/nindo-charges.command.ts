import {SlashCommandBuilder} from "discord.js";
import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";
import CharacterService from "../services/character.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("charges")
        .setDescription("Permet d’utiliser des charges de nindo.")
        .addIntegerOption(option => option.setName("quantité").setDescription("La quantité de charges à utiliser.").setRequired(false)),
    async execute(interaction) {
        if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
        }
        if (!StateService.getSelectedCharacter(interaction.user.id)) {
            return await Responses.error(interaction, Messages.CHARACTER.NO_SELECTED_CHARACTER);
        }
        let character = StateService.getSelectedCharacter(interaction.user.id)!
        const quantity = interaction.options.getInteger("quantité") ?? 1;
        if (quantity < 1) {
            await Responses.error(interaction, Messages.CHARGES.INVALID_QUANTITY(quantity));
        } else if (character.nindoCharges < quantity) {
            await Responses.error(interaction, Messages.CHARGES.NOT_ENOUGH_CHARGES(character.nindoCharges, quantity));
        } else {
            await CharacterService.Nindo.useCharges(interaction.user.id, character, quantity);
            await Responses.success(interaction, Messages.CHARGES.SUCCESSFUL_USE_CHARGES(quantity, character), StateService.isInSenseiMode(interaction.user.id));
        }
    }
};

export default command;