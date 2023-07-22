import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import DiceUtils from "../utils/dice.utils.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("jet")
        .setDescription("Permet de lancer des dés. Si un nombre est fournit, lance 1d10e10 avec le nombre en bonus.")
        .addStringOption(builder => builder.setName("formule").setDescription("Les dés à lancer ou le bonus a appliquer").setRequired(false)),
    async execute(interaction) {
        if (interaction.options.getString("formule")?.toLowerCase() === "réponse d") {
            await Responses.easterEgg(interaction, Messages.DICE.D);
            return;
        }
        let input = interaction.options.getString("formule") || "1d10e10";
        input = input.toLowerCase().replace(/ /g, "");
        if (input.match(/^\d[0-9+\-\/*]*$/)) input = `1d10e10+${input}`;
        if (input.match(/^[+\-\/*][0-9+\-\/*]+$/)) input = `1d10e10${input}`;
        try {
            const parseDiceRoll = DiceUtils.parseDiceRoll(input);
            await Responses.success(interaction, Messages.DICE.SUCCESS(input, parseDiceRoll.result, parseDiceRoll.details), false);
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