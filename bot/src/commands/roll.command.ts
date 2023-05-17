import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import DiceUtils from "../utils/dice.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Permet de lancer des dés")
        .addStringOption(builder => builder.setName("dés").setDescription("Les dés à lancer").setRequired(false)),
    async execute(interaction) {
        let input = interaction.options.get("dés")?.value as string || "1d10e10";
        if (input.match(/^\d+$/)) input = `1d10e10+${input}`;
        const parseDiceRoll = DiceUtils.parseDiceRoll(input);
        await interaction.reply({
            content: `Jet : \`${input}\` Résultat : \`${parseDiceRoll.result}\` Détails : \`${parseDiceRoll.details}\``
        });
    }
}

export default command;