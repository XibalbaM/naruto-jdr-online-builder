import {ComponentType, SlashCommandBuilder} from "discord.js";
import opportunities from "../datas/opportunities.js";
import Responses from "../utils/responses.utils.js";

import {SlashCommand} from "../classes.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("opportunités")
        .setDescription("Affiche la liste des opportunités"),
    async execute(interaction) {

        const message = "- " + opportunities.join("\n- ");

        await Responses.successEmbed(interaction, "Opportunités", message);
    }
};

export default command;