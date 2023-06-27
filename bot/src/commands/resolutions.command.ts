import {ActionRowBuilder, ButtonBuilder, ComponentType, SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {ButtonStyle, SlashCommand} from "../classes.js";
import resolutions from "../datas/resolutions.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("résolutions")
        .setDescription("Affiche la liste résolutions narratives d'une compétence")
        .addStringOption(option => option
            .setName("compétence")
            .setDescription("La compétence dont vous voulez afficher les résolutions narratives")
            .setRequired(true)
            .setChoices(...Object.keys(resolutions).map(key => ({name: key, value: key})))
        ),
    async execute(interaction) {

        const message = "- " + resolutions[interaction.options.getString("compétence", true) as keyof typeof resolutions].join("\n- ");

        await Responses.sendResolutions(interaction, interaction.options.getString("compétence", true), message);
    }
};

export default command;