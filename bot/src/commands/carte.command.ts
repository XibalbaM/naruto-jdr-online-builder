import {Attachment, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import config from "../config/env.js";

export default {
    command: new SlashCommandBuilder()
        .setName("carte")
        .setDescription("Affiche la carte de l'univers"),
    async execute(interaction) {

        const embed = new EmbedBuilder().setColor("#00ff00").setTitle("Carte de l'univers").setImage(`${config.api_url}/resources/map`);

        interaction.reply({
            embeds: [embed]
        });
    }
};