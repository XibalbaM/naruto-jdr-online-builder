import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import DiceUtils from "../utils/dice.utils.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("jet")
        .setDescription("Permet de lancer des dés. Si un nombre est fournit, lance 1d10e10 avec le nombre en bonus.")
        .addStringOption(builder => builder.setName("formule").setDescription("Les dés à lancer ou le bonus a appliquer").setRequired(true))
        .addStringOption(builder => builder.setName("label").setDescription("Un label pour reconnaître le jet").setRequired(false)),
    async execute(interaction) {
        if ((interaction.options.get("formule", true).value as string).toLowerCase() === "réponse d") {
            await Responses.easterEgg(interaction, Messages.DICE.D);
            return;
        }
        let input = interaction.options.get("formule", true).value as string;
        input = input.toLowerCase().replace(/ /g, "");
        if (input.match(/^\d[0-9+\-\/*]*$/)) input = `1d10e10+${input}`;
        if (input.match(/^[+\-\/*][0-9+\-\/*]+$/)) input = `1d10e10${input}`;
        try {
            const parseDiceRoll = DiceUtils.parseDiceRoll(input);
            const username = interaction.guild?.members.cache.get(interaction.user.id)?.displayName || interaction.user.username;
            await Responses.success(interaction, Messages.DICE.SUCCESS(input, parseDiceRoll.result, parseDiceRoll.details, username, interaction.options.get("label")?.value as string ?? null), StateService.isInSenseiMode(interaction.user.id),
                StateService.isInSenseiMode(interaction.user.id) ? Messages.DICE.LIGHT(parseDiceRoll.result, username, interaction.options.get("label")?.value as string ?? null) : []);
        } catch (e) {
            switch (e.message) {
                case "Invalid input":
                    await Responses.error(interaction, Messages.DICE.INVALID_INPUT);
                    break;
                default:
                    await Responses.error(interaction, Messages.ERRORS.UNKNOWN);
            }
        }
    }
}

export default command;