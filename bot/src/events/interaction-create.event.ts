import {Events, Interaction} from "discord.js";
import {BotEvent} from "../classes";

const event: BotEvent = {
    name: Events.InteractionCreate,
    execute: async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            let command = interaction.client.slashCommands.get(interaction.commandName);

            if (!command) {
                console.error(`Command ${interaction.commandName} not found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({content: "Une erreur est survenue lors de l'exécution de cette commande !", ephemeral: true});
                } else {
                    await interaction.reply({content: "Une erreur est survenue lors de l'exécution de cette commande !", ephemeral: true});
                }
            }
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.slashCommands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                if (!command.autocomplete) return;
                command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    },
};

export default event;