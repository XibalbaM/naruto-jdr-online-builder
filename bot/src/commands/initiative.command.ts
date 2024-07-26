import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";
import DiceUtils from "../utils/dice.utils.js";
import DataService from "../services/data.service.js";
import {findById} from "../utils/data.utils.js";
import {getAllSkills} from "../models/character.model";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("initiative")
        .setDescription("Effectue un jet d'initiative.")
        .addStringOption(option => option.setRequired(false).setName("score").setDescription("Le score d'initiative à utiliser pour le jet (remplace celui du personnage est sélectionné)."))
        .addStringOption(option => option.setRequired(false).setName("bonus").setDescription("Bonus sur le jet d'initiative."))
        .addStringOption(option => option.setRequired(false).setName("nom").setDescription("Le nom du personnage dont c'est l'initiative (remplace celui du personnage est sélectionné).")),
    async execute(interaction) {
        let score = interaction.options.get("score")?.value as string | undefined;
        if (score === undefined) {
            if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
                return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
            }
            const character = StateService.getSelectedCharacter(interaction.user.id);
            if (!character) {
                return await Responses.error(interaction, Messages.CHARACTER.NO_SELECTED_CHARACTER);
            }
            const baseLevel = character.bases[0];
            const skillLevel = getAllSkills(character).find(skill => skill.skill.name === "Physique")!.level;
            let formula = "1d10e10+" + (baseLevel + skillLevel)
            if (interaction.options.get("bonus")) {
                formula += "+" + interaction.options.get("bonus")?.value as string;
            }
            let roll = DiceUtils.parseDiceRoll(formula);
            let characterName = interaction.options.get("nom")?.value as string ?? character!.firstName + " " + findById(DataService.clans, character!.clan)?.name;
            await Responses.success(interaction, Messages.DICE.SUCCESS(formula, roll.result, roll.details, characterName, "Initiative"), StateService.isInSenseiMode(interaction.user.id));
            StateService.setInitiative(interaction.guildId!, interaction.channelId!, characterName, roll.result);
        } else {
            let formula = "1d10e10+" + score;
            if (interaction.options.get("bonus")) {
                formula += "+" + interaction.options.get("bonus")?.value as string;
            }
            let roll = DiceUtils.parseDiceRoll(formula);
            let username = interaction.options.get("nom")?.value as string ?? interaction.guild?.members.cache.get(interaction.user.id)?.displayName ?? interaction.user.username;
            await Responses.success(interaction, Messages.DICE.SUCCESS(formula, roll.result, roll.details, username, "Initiative"), StateService.isInSenseiMode(interaction.user.id));
            StateService.setInitiative(interaction.guildId!, interaction.channelId!, username, roll.result);
        }
    }
};

export default command;