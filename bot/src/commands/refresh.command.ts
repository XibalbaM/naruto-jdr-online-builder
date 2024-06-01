import {PermissionsBitField, SlashCommandBuilder} from "discord.js";

import {SlashCommand} from "../classes.js";
import DataService from "../services/data.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("mise-a-jour")
        .setDescription("Met a jour la mémoire de Moot-kun."),
    async execute(interaction) {
        if ((interaction.member?.permissions as Readonly<PermissionsBitField>).has(PermissionsBitField.Flags.ManageMessages)) {
            await Responses.success(interaction, "Données mises à jour !", true);
            await DataService.refreshData();
        } else {
            await Responses.error(interaction, Messages.NO_PERMISSION("gérer les messages"))
        }
    },
    hidden: true
};

export default command;