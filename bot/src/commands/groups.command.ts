import {SlashCommand} from "../classes";
import {SlashCommandBuilder} from "discord.js";
import GroupsService from "../services/groups.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("groupes")
        .setDescription("Permet d'obtenir la liste des groupes dans lesquels vous êtes."),
    async execute(interaction) {
        /*try {
            const groups = await GroupsService.list(interaction.user.id);
            let i = 1;
            await Responses.success(interaction, Messages.GROUPS.LIST(groups))
        } catch (e) {
            switch (e.message) {
                case "no account linked":
                    await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
                    break;
                default:
                    await Responses.error(interaction, Messages.ERRORS.UNKNOWN);
            }
        }*/
        await Responses.error(interaction, Messages.ERRORS.NOT_IMPLEMENTED);
    },
    implemented: false
}

export default command;