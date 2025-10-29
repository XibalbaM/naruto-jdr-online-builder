import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";
import DiceUtils from "../utils/dice.utils.js";
import DataService from "../services/data.service.js";
import {getAllSkills} from "../models/character.model.js";
import {fullName} from "naruto-jdr-online-builder-common/src/utils/character.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("initiative")
        .setDescription("Effectue un jet d'initiative.")
        .addStringOption(option => option.setRequired(false).setName("bonus").setDescription("Bonus sur le jet d'initiative.")),
    async execute(interaction) {
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
        let characterName = interaction.options.get("nom")?.value as string ?? fullName(character, DataService.clans);
        StateService.setInitiative(interaction.guildId!, interaction.channelId!, characterName, roll.result);
        await Responses.success(interaction, Messages.DICE.SUCCESS(formula, roll.result, roll.details, characterName, "Initiative"), StateService.isInSenseiMode(interaction.user.id),
            StateService.isInSenseiMode(interaction.user.id) ? Messages.DICE.LIGHT(roll.result, characterName, "Initiative") : []);
        await Responses.followUp(interaction, Messages.CHARACTER.NEW_TURN_SUMMARY(character), true);
    }
};

export default command;