import {ComponentType, SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {SlashCommand} from "../classes.js";
import rules from "../datas/rules.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("règles")
        .setDescription("Permet l'accès rapide à certaines règles.")
        .addStringOption(option => option
            .setName("règle")
            .setDescription("La règle que vous voulez afficher")
            .setRequired(true)
            .setChoices(...Object.keys(rules).map(rule => ({name: rule, value: rule})))
        ),
    async execute(interaction) {

        const name = interaction.options.getString("règle", true) as keyof typeof rules;

        let description: string;

        switch (name) {
            case "Types d'actions":
                description = "- " + rules[name].join("\n- ");
                break;
            case "Distances, zones et durées":
                description = "**Distances**\n";
                rules[name].Distances.forEach((value, index) => description += `D${index + 1}: ${value}\n`);
                description += "\n**Zones**\n";
                rules[name].Zones.forEach((value, index) => description += `Z${index + 1}: ${value.size} ${value.parade !== 0 ? `(${value.parade} Parade${value.esquive !== 0 ? `, ${value.esquive} Esquive` : ""})` : ""}\n`);
                description += "\n**Durées**\n";
                rules[name]["Durées"].forEach((value, index) => description += `Du${index + 1}: ${value}\n`);
                break;
            case "Portées, durées et cibles":
                const data = rules[name];
                const keys = Object.keys(data) as (keyof typeof data)[];
                description = keys.map(key => `**${key}**\n${data[key].description}\n- ${data[key].values.join("\n- ")}`).join("\n\n");
                break;
            default:
                description = "Cette règle n'existe pas ou n'est pas implémentée."
        }

        await Responses.successEmbed(interaction, name, description);
    }
};

export default command;