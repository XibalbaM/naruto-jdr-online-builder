import {ComponentType, SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {SlashCommand} from "../classes.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("aide")
        .setDescription("Affiche la liste des commandes"),
    async execute(interaction) {

        const text = "- " + interaction.client.slashCommands
            .filter(value => value.implemented === undefined || value.implemented)
            .map((value) => `**/${value.command.name}**\n${value.command.description}`)
            .join("\n- ");

        await Responses.successEmbed(interaction, "Liste des commandes", text);
    }
};

export default command;