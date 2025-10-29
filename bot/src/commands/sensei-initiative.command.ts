import {SlashCommandBuilder} from "discord.js";
import {SlashCommand} from "../classes.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("sensei-initiative")
        .setDescription("Gestions des initiatives pour le sensei.")
        .addSubcommand(subcommand => subcommand.setName("liste").setDescription("Liste les initiatives dans l'ordre."))
        .addSubcommand(subcommand => subcommand.setName("effacer").setDescription("Efface les initiatives.")),
    async execute(interaction) {
        if (!StateService.isInSenseiMode(interaction.user.id)) {
            await Responses.error(interaction, Messages.SENSEI_MODE_NOT_ACTIVATED);
            return;
        }
        if (interaction.options.getSubcommand(true) === "liste") {
            const initiativesMap = StateService.getInitiatives(interaction.guildId!, interaction.channelId!);
            const initiatives = Array.from(initiativesMap.entries()).map(([name, score]) => ({name, score}));
            if (initiatives.length === 0) {
                await Responses.error(interaction, Messages.INITIATIVE.NO_INITIATIVE, true);
                return;
            }
            await Responses.success(interaction, Messages.INITIATIVE.LIST(initiatives), true, Messages.INITIATIVE.LIST(initiatives));
        } else if (interaction.options.getSubcommand(true) === "effacer") {
            StateService.clearInitiatives(interaction.guildId!, interaction.channelId!);
            await Responses.success(interaction, Messages.INITIATIVE.CLEARED, true);
        }
    }
};

export default command;