import {SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {SlashCommand} from "../classes.js";
import resolutions from "../datas/resolutions.js";
import StateService from "../services/state.service.js";

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

        const message = "- " + resolutions[interaction.options.get("compétence", true).value as keyof typeof resolutions].join("\n- ");

        await Responses.successEmbed(interaction, "Résolutions narratives de la compétence " + interaction.options.get("compétence", true).value, message, !StateService.isInSenseiMode(interaction.user.id));
    }
};

export default command;