import {SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {SlashCommand} from "../classes.js";
import nindo from "../datas/nindo.js";
import StateService from "../services/state.service.js";
import AuthService from "../services/auth.service";
import Messages from "../utils/messages.utils";
import CharacterService from "../services/character.service";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("nindo")
        .setDescription("Affiche la liste des options pour utiliser les points de nindo.")
        .addSubcommand(subcommand => subcommand.setName("info").setDescription("Affiche la liste des options pour utiliser les points de nindo."))
        .addSubcommand(subcommand => subcommand
            .setName("utiliser")
            .setDescription("Utiliser des points de nindo.")
            .addStringOption(option => option.setName("conversion").setDescription("La conversion à utiliser.").setRequired(true).setAutocomplete(true))
        ),
    async execute(interaction) {

        switch (interaction.options.getSubcommand()) {
            case "info": {
                const text = nindo.map(nindo => `### - ${nindo.title}\n**Coût :** ${nindo.cost} points de Nindo\n**Temporalité :** ${nindo.time}\n${nindo.description}`).join("\n");

                await Responses.successEmbed(interaction, "Dépenser du Nindo", text, !StateService.isInSenseiMode(interaction.user.id));
                break;
            }
            case "utiliser": {
                if (!await AuthService.isDiscordAccountLinked(interaction.user.id)) {
                    return await Responses.error(interaction, Messages.LINKING.NO_ACCOUNT_LINKED);
                }
                if (!StateService.getSelectedCharacter(interaction.user.id)) {
                    return await Responses.error(interaction, Messages.CHARACTER.NO_SELECTED_CHARACTER);
                }
                const character = StateService.getSelectedCharacter(interaction.user.id)!;
                const option = interaction.options.get("conversion")!.value as string;
                const nindoSkill = nindo.find(nindo => nindo.title === option);
                if (!nindoSkill) {
                    return await Responses.error(interaction, Messages.NINDO.CONVERSION_NOT_FOUND(option));
                }
                if (character.nindoPoints < nindoSkill.cost) {
                    return await Responses.error(interaction, Messages.NINDO.NOT_ENOUGH_POINTS(character.nindoPoints, nindoSkill.cost));
                }
                await CharacterService.Nindo.spend(interaction.user.id, character, nindoSkill.cost);
                await Responses.success(interaction, Messages.NINDO.SUCCESSFUL_USE(nindoSkill.title, nindoSkill.cost, character), StateService.isInSenseiMode(interaction.user.id));
                if (nindoSkill.title === "DÉPASSEMENT (1)") {
                    await CharacterService.Nindo.gainCharges(interaction.user.id, character);
                    await Responses.followUp(interaction, Messages.NINDO.DEPASSEMENT_SUCCESSFUL_USE(character), true);
                }
                break;
            }
        }
    },
    async autocomplete(interaction) {
        //Autocomplete subcommand use with nindo titles.
        if (interaction.options.getSubcommand() === "utiliser") {
            const focusedValue = interaction.options.getFocused();
            const filtered = focusedValue ? nindo.filter(nindo => nindo.title.toLowerCase().includes(focusedValue.toLowerCase())) : nindo;
            await interaction.respond(filtered.map(nindo => ({name: formatTitle(nindo.title), value: nindo.title})));
        }
    }
};

function formatTitle(title: string) {
    //Set to sentence case and cut before first opening parenthesis
    const sentenceCase = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
    const cutIndex = sentenceCase.indexOf("(");
    return cutIndex !== -1 ? sentenceCase.slice(0, cutIndex).trim() : sentenceCase;
}

export default command;