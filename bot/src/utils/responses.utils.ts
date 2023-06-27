import {AttachmentBuilder, ChatInputCommandInteraction, CommandInteraction, EmbedBuilder, MessageComponentInteraction} from "discord.js";
import Messages from "./messages.utils.js";

/**
 * Type of interaction that can be accepted by the responses.
 */
type AcceptedInteraction = ChatInputCommandInteraction<any> | CommandInteraction | MessageComponentInteraction;

/**
 * Class containing methods that send responses, used to centralize these to make it easier to change in the future.
 */
export default class Responses {

    static async success(interaction: AcceptedInteraction, message: string, ephemeral = true, components: any[] = []) {
        return await interaction.reply({
            content: message,
            ephemeral,
            components
        });
    }

    static async error(interaction: AcceptedInteraction, message: string, ephemeral = true, components: any[] = []) {
        return await interaction.reply({
            content: message,
            ephemeral,
            components
        });
    }

    static async easterEgg(interaction: AcceptedInteraction, message: string, components: any[] = []) {
        await interaction.reply({
            content: Messages.EASTER_EGG,
            ephemeral: true
        });
        if (interaction.channel) {
            return await interaction.channel.send({
                content: message,
                components
            });
        }
    }

    static async image(interaction: AcceptedInteraction, data: { title: string, url: string }, ephemeral = false) {
        const fileName = data.url.split("/").pop();
        const attachment = new AttachmentBuilder(data.url).setDescription(data.title);
        return await interaction.reply({
            ephemeral,
            embeds: [
                new EmbedBuilder().setTitle(data.title).setImage("attachment://" + fileName).setColor("Random")
            ],
            files: [attachment]
        });
    }

    static async sendOpportunities(interaction: AcceptedInteraction, message: string) {

        return await interaction.reply({
                embeds: [
                    new EmbedBuilder().setTitle("Opportunités").setDescription(message).setColor("Random")
                ]
            }
        );
    }

    static async sendNindo(interaction: AcceptedInteraction, text: string) {

        return await interaction.reply({
            embeds: [
                new EmbedBuilder().setTitle("Liste des options pour utiliser les points de nindo").setDescription(text).setColor("Random")
            ]
        });
    }

    static async sendResolutions(interaction: AcceptedInteraction, skill: string, message: string) {

        return await interaction.reply({
                embeds: [
                    new EmbedBuilder().setTitle("Résolutions narratives de la compétence " + skill).setDescription(message).setColor("Random")
                ]
            }
        );
    }

    static async sendRule(interaction: AcceptedInteraction, name: string, description: string) {

        return await interaction.reply({
                embeds: [
                    new EmbedBuilder().setTitle(name).setDescription(description).setColor("Random")
                ]
            }
        );
    }

    static async sendHelp(interaction: AcceptedInteraction, text: string) {

        return await interaction.reply({
                embeds: [
                    new EmbedBuilder().setTitle("Liste des commandes").setDescription(text).setColor("Random")
                ]
            }
        );
    }
}