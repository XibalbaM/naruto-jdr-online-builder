import {ActionRowBuilder, ButtonBuilder, ComponentType, SlashCommandBuilder} from "discord.js";

import {ButtonStyle, SlashCommand} from "../classes.js";
import Responses from "../utils/responses.utils.js";
import Messages from "../utils/messages.utils.js";
import StateService from "../services/state.service.js";
import DiceUtils from "../utils/dice.utils.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("initiative-pnj")
        .setDescription("Configure et effectue un jet d'initiative pour plusieurs PNJs.")
        .addSubcommand(subcommand => subcommand
            .setName("ajouter")
            .setDescription("Ajoute un PNJ à la liste des PNJs configurés.")
            .addStringOption(option => option.setName("nom").setDescription("Le nom du PNJ.").setRequired(true))
            .addIntegerOption(option => option.setName("initiative").setDescription("L'initiative du PNJ.").setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName("supprimer")
            .setDescription("Supprime un PNJ de la liste des PNJs configurés.")
            .addStringOption(option => option.setName("nom").setDescription("Le nom du PNJ.").setRequired(true).setAutocomplete(true))
        )
        .addSubcommand(subcommand => subcommand.setName("effacer").setDescription("Efface la liste des PNJs configurés."))
        .addSubcommand(subcommand => subcommand.setName("liste").setDescription("Affiche la liste des PNJs configurés."))
        .addSubcommand(subcommand => subcommand.setName("lancer").setDescription("Lance les initiatives des PNJs configurées.")),
    async execute(interaction) {
        let pnjs = StateService.getPNJs(interaction.guildId!, interaction.channelId!, interaction.user.id);
        switch (interaction.options.getSubcommand()) {
            case "ajouter":
                let newPnjName = interaction.options.getString("nom", true);
                if (pnjs.some(pnj => pnj.name === newPnjName)) {
                    return await Responses.error(interaction, Messages.INITIATIVE.PNJ_ALREADY_EXISTS(newPnjName), true);
                }
                let initiative = interaction.options.getInteger("initiative", true);
                StateService.addPNJ(interaction.guildId!, interaction.channelId!, interaction.user.id, newPnjName, initiative);
                await Responses.success(interaction, Messages.INITIATIVE.PNJ_ADDED(newPnjName, initiative), true);
                break;
            case "supprimer":
                let pnjToRemove = interaction.options.getString("nom", true);
                StateService.removePNJ(interaction.guildId!, interaction.channelId!, interaction.user.id, pnjToRemove);
                await Responses.success(interaction, Messages.INITIATIVE.PNJ_REMOVED(pnjToRemove), true);
                break;
            case "effacer":
                let buttons = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder().setCustomId("confirm").setLabel("Oui, effacer").setStyle(ButtonStyle.DANGER))
                    .addComponents(new ButtonBuilder().setCustomId("cancel").setLabel("Annuler").setStyle(ButtonStyle.PRIMARY))
                let message = await Responses.success(interaction, Messages.INITIATIVE.PNJ_CLEAR_CONFIRM, true, [buttons]);
                message.createMessageComponentCollector({componentType: ComponentType.Button, time: 60000}).on("collect", async i => {
                    if (i.customId === "confirm") {
                        StateService.clearPNJs(interaction.guildId!, interaction.channelId!, interaction.user.id);
                        await i.update({
                            content: Messages.INITIATIVE.PNJ_CLEARED,
                            components: []
                        });
                    } else {
                        await i.update({
                            content: Messages.INITIATIVE.PNJ_CLEAR_CANCEL,
                            components: []
                        });
                    }
                })
                break;
            case "liste":
                if (pnjs.length === 0) {
                    return await Responses.error(interaction, Messages.INITIATIVE.NO_PNJS, true);
                }
                await Responses.success(interaction, Messages.INITIATIVE.PNJS_LIST(pnjs), true);
                break;
            case "lancer":
                if (pnjs.length === 0) {
                    return await Responses.error(interaction, Messages.INITIATIVE.NO_PNJS, true);
                }
                const rolls = pnjs.map(pnj => {
                    const formula = "1d10e10+" + pnj.initiative;
                    const roll = DiceUtils.parseDiceRoll(formula);
                    StateService.setInitiative(interaction.guildId!, interaction.channelId!, pnj.name, roll.result);
                    return {name: pnj.name, roll: roll};
                });
                await Responses.success(interaction, Messages.INITIATIVE.PNJS_ROLLED(rolls, interaction.user.displayName), StateService.isInSenseiMode(interaction.user.id),
                    StateService.isInSenseiMode(interaction.user.id) ? Messages.INITIATIVE.PNJS_ROLLED_LIGHT(rolls, interaction.user.displayName) : []);
                break;
        }
    },
    async autocomplete(interaction) {
        let pnjs = StateService.getPNJs(interaction.guildId!, interaction.channelId!, interaction.user.id).map(pnj => pnj.name);
        const focusedValue = interaction.options.getFocused();
        const filtered = pnjs.filter(name => name.toLowerCase().includes(focusedValue.toLowerCase()));
        await interaction.respond(filtered.map(name => ({name: name, value: name})));
    }
};

export default command;