import {
    ActionRowBuilder,
    AttachmentBuilder, ButtonBuilder,
    ChatInputCommandInteraction,
    CommandInteraction,
    ComponentType,
    EmbedBuilder,
    MessageComponentInteraction
} from "discord.js";
import Messages from "./messages.utils.js";
import {ButtonStyle} from "../classes.js";

/**
 * Type of interaction that can be accepted by the responses.
 */
type AcceptedInteraction = ChatInputCommandInteraction<any> | CommandInteraction | MessageComponentInteraction;

/**
 * Class containing methods that send responses, used to centralize these to make it easier to change in the future.
 */
export default class Responses {

    static async success(interaction: AcceptedInteraction, text: string, ephemeral = true, components: any[] | string = []) {
        let componentsToUse = typeof components === "string"
            ? [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("public").setLabel("Rendre public").setStyle(ButtonStyle.PRIMARY))]
            : components;
        let message = await interaction.reply({
            content: text,
            ephemeral,
            components: componentsToUse
        });
        if (typeof components === "string") {
            message.createMessageComponentCollector({componentType: ComponentType.Button, time: 60000}).on("collect", async i => {
                if (i.customId === "public") {
                    await Responses.success(i, components, false)
                }
            })
        }
        return message;
    }

    static async error(interaction: AcceptedInteraction, message: string, ephemeral = true, components: any[] = []) {
        return await interaction.reply({
            content: message,
            ephemeral,
            components
        });
    }

    static async followUp(interaction: AcceptedInteraction, message: string, ephemeral = true, components: any[] = []) {
        return await interaction.followUp({
            content: message,
            ephemeral,
            components
        })
    }

    static async easterEgg(interaction: AcceptedInteraction, message: string, components: any[] = []) {
        await interaction.reply({
            content: Messages.EASTER_EGG,
            ephemeral: true
        });
        if (interaction.channel) {
            // @ts-ignore
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

    static async successEmbed(interaction: AcceptedInteraction, title: string, text: string, ephemeral: boolean = true, components: any[] = []) {
        return await interaction.reply({
            embeds: [
                new EmbedBuilder().setTitle(title).setDescription(text).setColor("Random")
            ],
            components,
            ephemeral
        });
    }

    static async replaceSuccessEmbed(interaction: AcceptedInteraction, title: string, text: string, components: any[] = []) {
        return await interaction.editReply({
            embeds: [
                new EmbedBuilder().setTitle(title).setDescription(text).setColor("Random")
            ],
            components
        });
    }
}