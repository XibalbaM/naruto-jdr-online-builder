import {SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {SlashCommand} from "../classes.js";
import StateService from "../services/state.service.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("mode-sensei")
        .setDescription("Active ou désactive le mode sensei")
        .addSubcommand(subcommand => subcommand.setName("on").setDescription("Active le mode sensei"))
        .addSubcommand(subcommand => subcommand.setName("off").setDescription("Désactive le mode sensei")),
    async execute(interaction) {

        if (interaction.options.getSubcommand(true) === "on" && StateService.isInSenseiMode(interaction.user.id)
            || interaction.options.getSubcommand(true) === "off" && !StateService.isInSenseiMode(interaction.user.id)) {
            await Responses.error(interaction, Messages.SENSEI_MODE_NOT_CHANGED(StateService.isInSenseiMode(interaction.user.id)));
        } else {
            StateService.setInSenseiMode(interaction.user.id, interaction.options.getSubcommand(true) === "on");
            await Responses.success(interaction, Messages.SENSEI_MODE_CHANGED(StateService.isInSenseiMode(interaction.user.id)));
        }
    }
};

export default command;