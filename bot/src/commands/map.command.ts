import {SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import Messages from "../utils/messages.utils.js";
import Responses from "../utils/responses.utils.js";
import StateService from "../services/state.service.js";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("carte")
		.setDescription("Affiche la carte du monde"),
	async execute(interaction) {
		await Responses.image(interaction, Messages.IMAGES.MAP, !StateService.isInSenseiMode(interaction.user.id));
	}
};

export default command;