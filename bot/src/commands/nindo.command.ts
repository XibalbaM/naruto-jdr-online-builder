import {ActionRowBuilder, ButtonBuilder, ComponentType, SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {ButtonStyle, SlashCommand} from "../classes.js";
import nindo from "../datas/nindo.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("nindo")
        .setDescription("Affiche la liste des options pour utiliser les points de nindo."),
    async execute(interaction) {

        const text = nindo.map(nindo => `### - ${nindo.title}\n**Coût :** ${nindo.cost}\n**Temporalité :** ${nindo.time}\n${nindo.description}`).join("\n");

        await Responses.sendNindo(interaction, text);
    }
};

export default command;