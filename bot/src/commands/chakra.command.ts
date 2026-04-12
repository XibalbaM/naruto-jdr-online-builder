import {SlashCommandBuilder} from "discord.js";
import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";
import CharacterService from "../services/character.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("chakra")
        .setDescription("Permet de gérer le chakra d’un personnage.")
        .addSubcommand(subcommand => subcommand.setName("quantité").setDescription("Affiche la quantité de chakra actuelle du personnage sélectionné."))
        .addSubcommand(subcommand => subcommand.setName("restaurer").setDescription("Restaure tous les points de chakra dépensés"))
        .addSubcommand(subcommand => subcommand
            .setName("dépenser")
            .setDescription("Permet de dépenser des points de chakra.")
            .addIntegerOption(option => option.setName("quantité").setDescription("La quantité de chakra à dépenser.").setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName("gagner")
            .setDescription("Permet de gagner des points de chakra.")
            .addIntegerOption(option => option.setName("quantité").setDescription("La quantité de chakra à gagner.").setRequired(true))
        ),
    async execute(interaction) {
        if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
        }
        if (!StateService.getSelectedCharacter(interaction.user.id)) {
            return await Responses.error(interaction, Messages.CHARACTER.NO_SELECTED_CHARACTER);
        }
        let character = StateService.getSelectedCharacter(interaction.user.id)!
        switch (interaction.options.getSubcommand()) {
            case "quantité":
                await Responses.success(interaction, Messages.CHAKRA.QUANTITY(character), true);
                break;
            case "restaurer":
                await CharacterService.Chakra.restore(interaction.user.id, character);
                await Responses.success(interaction, Messages.CHAKRA.RESTORED, true);
                break;
            case "dépenser":
                let quantityToSpend = interaction.options.getInteger("quantité", true);
                await CharacterService.Chakra.spend(interaction.user.id, character, quantityToSpend);
                await Responses.success(interaction, Messages.CHAKRA.SPENT(quantityToSpend, character.activeChakraAmount), true);
                break;
            case "gagner":
                let quantityToGain = interaction.options.getInteger("quantité", true);
                await CharacterService.Chakra.gain(interaction.user.id, character, quantityToGain);
                await Responses.success(interaction, Messages.CHAKRA.GAINED(quantityToGain, character.activeChakraAmount), true);
                break;
        }
    }
};

export default command;