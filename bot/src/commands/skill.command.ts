import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import AuthService from "../services/auth.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";
import DiceUtils from "../utils/dice.utils.js";
import DataService from "../services/data.service.js";
import {findById} from "../utils/data.utils.js";
import {getAllSkills} from "../models/character.model.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("compétence")
        .setDescription("Effectue un jet de la compétence choisie.")
        .addStringOption(builder => builder.setName("compétence").setDescription("La compétence à lancer").setRequired(true).setAutocomplete(true))
        .addStringOption(builder => builder.setName("bonus").setDescription("Un bonus à appliquer au jet").setRequired(false)),
    async execute(interaction) {
        if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
            return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
        }
        if (!StateService.getSelectedCharacter(interaction.user.id)) {
            return await Responses.error(interaction, Messages.CHARACTER.NO_SELECTED_CHARACTER);
        }
        const skill = interaction.options.get("compétence")!.value as string;
        let bonus = interaction.options.get("bonus")?.value as string | undefined;
        const character = StateService.getSelectedCharacter(interaction.user.id)!;
        const characterSkills = getAllSkills(character);
        let skillInfo = characterSkills.find(s => s.skill.name === skill);
        if (skillInfo === undefined) {
            return await Responses.error(interaction, Messages.SKILLS.SKILL_NOT_FOUND);
        }
        if (bonus?.match(/^\d[0-9+\-\/*]*$/)) bonus = `1d10e10+${bonus}+${skillInfo.level + character.bases[skillInfo.skill.base]}`;
        else if (bonus?.match(/^[+\-\/*][0-9+\-\/*]+$/)) bonus = `1d10e10${bonus}+${skillInfo.level + character.bases[skillInfo.skill.base]}`;
        else bonus = "1d10e10+" + (skillInfo.level + character.bases[skillInfo.skill.base]);
        let roll = DiceUtils.parseDiceRoll(bonus);
        let username = StateService.getSelectedCharacter(interaction.user.id)!.firstName + " " + findById(DataService.clans, StateService.getSelectedCharacter(interaction.user.id)!.clan)?.name;
        await Responses.success(interaction, Messages.DICE.SUCCESS(bonus, roll.result, roll.details, username, skill), StateService.isInSenseiMode(interaction.user.id));
    },
    async autocomplete(interaction) {
        if (!StateService.getSelectedCharacter(interaction.user.id)) {
            return await interaction.respond([{name: "Aucun personnage sélectionné", value: "Aucun personnage sélectionné"}]);
        }
        const character = StateService.getSelectedCharacter(interaction.user.id)!;
        const characterSkills = getAllSkills(character).map(skill => skill.skill.name);
        const focusedValue = interaction.options.getFocused();
        const filtered = focusedValue ? characterSkills.filter(skill => skill.toLowerCase().includes(focusedValue.toLowerCase())) : characterSkills;
        await interaction.respond(filtered.map(skill => ({name: skill, value: skill})))
    }
};

export default command;