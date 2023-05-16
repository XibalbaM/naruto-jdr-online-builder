import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import authService from "../services/auth.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("déconnexion")
        .setDescription("Permet de déconnecter son compte discord de son compte en ligne"),
    async execute(interaction) {
        if (await authService.isDiscordAccountLinked(interaction.user.id)) {
            if (await authService.unlinkDiscordAccount(interaction.user.id)) {
                await interaction.reply({
                    content: "Votre compte discord a été délié de votre compte en ligne.",
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "Une erreur est survenue lors de la déconnexion de votre compte discord.",
                    ephemeral: true,
                });
            }
        } else {
            await interaction.reply({
                content: "Votre compte discord n'est pas lié à un compte en ligne.",
                ephemeral: true,
            });
        }
    }
}

export default command;