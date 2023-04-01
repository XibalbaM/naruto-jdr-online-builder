import {SlashCommandBuilder} from "discord.js";

export default {
    command: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply({content: 'Pong!', ephemeral: true});
    }
}