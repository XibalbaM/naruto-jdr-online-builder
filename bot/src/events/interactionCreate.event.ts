import {Events} from "discord.js";

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`Command ${interaction.commandName} not found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error)
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "Une erreur est survenue lors de l'exécution de cette commande!", ephemeral: true });
            } else {
                await interaction.reply({ content: "Une erreur est survenue lors de l'exécution de cette commande!", ephemeral: true });
            }
        }
    }
}