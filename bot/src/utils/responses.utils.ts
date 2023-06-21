import {ChatInputCommandInteraction, CommandInteraction, Embed, EmbedBuilder, MessageComponentInteraction} from "discord.js";

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
			ephemeral
		});
	}

	static async error(interaction: AcceptedInteraction, message: string, ephemeral = true, components: any[] = []) {
		return await interaction.reply({
			content: message,
			ephemeral,
			components
		});
	}

	static async image(interaction: AcceptedInteraction, data: {title: string, url: string}, ephemeral = false) {
		return await interaction.reply({
            ephemeral,
            embeds: [
                new EmbedBuilder().setTitle(data.title).setImage(data.url).setColor("Random")
            ]
        });
	}
}