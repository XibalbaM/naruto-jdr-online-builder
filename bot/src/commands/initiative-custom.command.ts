import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";
import DiceUtils from "../utils/dice.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("initiative-custom")
        .setDescription("Effectue un jet d'initiative pour un personnage personnalisé.")
        .addStringOption(option => option.setRequired(true).setName("score").setDescription("Le score d'initiative à utiliser pour le jet (remplace celui du personnage est sélectionné)."))
        .addStringOption(option => option.setRequired(false).setName("nom").setDescription("Le nom du personnage dont c'est l'initiative (remplace celui du personnage est sélectionné)."))
        .addStringOption(option => option.setRequired(false).setName("bonus").setDescription("Bonus sur le jet d'initiative.")),
    async execute(interaction) {
        let score = interaction.options.getString("score", true)
        let formula = "1d10e10+" + score;
        if (interaction.options.get("bonus")) {
            formula += "+" + interaction.options.get("bonus")?.value as string;
        }
        let roll = DiceUtils.parseDiceRoll(formula);
        let username = interaction.options.get("nom")?.value as string ?? interaction.guild?.members.cache.get(interaction.user.id)?.displayName ?? interaction.user.username;
        await Responses.success(interaction, Messages.DICE.SUCCESS(formula, roll.result, roll.details, username, "Initiative"), StateService.isInSenseiMode(interaction.user.id));
        StateService.setInitiative(interaction.guildId!, interaction.channelId!, username, roll.result);
    }
};

export default command;