import {SlashCommand} from "../classes";
import {SlashCommandBuilder} from "discord.js";
import GroupsService from "../services/groups.service.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("selectionner")
        .setDescription("Permet de sélectionner l'élément actif. C'est sur cet element que seront effectuées les actions.")
        .addSubcommand(group => group
            .setName("groupe")
            .setDescription("Permet de choisir le groupe actif. C'est sur ce groupe que seront effectuées les actions.")
            .addIntegerOption(option => option
                .setName("numéro")
                .setDescription("Le numéro du groupe à sélectionner (affiché avec la commande `/groupes`.")
                .setRequired(false)
                .setMinValue(1)
            )
        ),
    async execute(interaction) {
        /*switch (interaction.options.getSubcommand()) {
            case "groupe": {
                try {
                    if (interaction.options.getInteger("numéro")) {
                        const groupName = await GroupsService.select(interaction.user.id, interaction.options.getInteger("numéro")!);
                        await Responses.success(interaction, Messages.GROUPS.SELECTED(groupName));
                    } else {
                        const groupName = await GroupsService.getSelected(interaction.user.id);
                        await Responses.success(interaction, Messages.GROUPS.WAS_SELECTED(groupName));
                    }
                } catch (e) {
                    switch (e.message) {
                        case "no account linked":
                            await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
                            break;
                        case "group not found":
                            await Responses.error(interaction, Messages.GROUPS.GROUP_NOT_FOUND);
                            break;
                        case "no selected group":
                            await Responses.error(interaction, Messages.GROUPS.NO_SELECTED_GROUP);
                            break;
                        default:
                            await Responses.error(interaction, Messages.ERRORS.UNKNOWN);
                    }
                }
            }
        }*/
        await Responses.error(interaction, Messages.ERRORS.NOT_IMPLEMENTED);
    },
    implemented: false
}

export default command;