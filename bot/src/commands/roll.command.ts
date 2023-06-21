import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import DiceUtils from "../utils/dice.utils.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Permet de lancer des dés. Si aucun paramètre n'est fourni, lance 1d10e10.")
        .addStringOption(builder => builder.setName("formule").setDescription("Les dés à lancer ou le bonus a appliquer").setRequired(false)),
    async execute(interaction) {
        if (interaction.options.getString("formule")?.toLowerCase() === "réponse d") {
            await Responses.success(interaction, Messages.DICE.D);
            return;
        }
        let input = interaction.options.get("formule")?.value as string || "1d10e10";
        if (input.match(/^\d+$/)) input = `1d10e10+${input}`;
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