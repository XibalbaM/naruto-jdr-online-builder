import {SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {SlashCommand} from "../classes.js";
import nindo from "../datas/nindo.js";
import StateService from "../services/state.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("nindo")
        .setDescription("Affiche la liste des options pour utiliser les points de nindo."),
    async execute(interaction) {

        const text = nindo.map(nindo => `### - ${nindo.title}\n**Coût :** ${nindo.cost}\n**Temporalité :** ${nindo.time}\n${nindo.description}`).join("\n");

        await Responses.successEmbed(interaction, "Dépenser du Nindo", text, !StateService.isInSenseiMode(interaction.user.id));
    }
};

export default command;