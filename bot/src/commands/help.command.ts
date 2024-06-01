import {SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {SlashCommand} from "../classes.js";
import StateService from "../services/state.service.js";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("aide")
		.setDescription("Affiche la liste des commandes"),
	async execute(interaction) {

		const text = "- " + interaction.client.slashCommands
			.filter(value => !value.hidden)
			.sort((a, b) => a.command.name.localeCompare(b.command.name))
			.map((value) => `**/${value.command.name}**\n${value.command.description}`)
			.join("\n- ");
		await Responses.successEmbed(interaction, "Liste des commandes", text, !StateService.isInSenseiMode(interaction.user.id));
	}
};

export default command;