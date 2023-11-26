import {SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {SlashCommand} from "../classes.js";
import StateService from "../services/state.service.js";
import parallelRealms from "../datas/parallelRealms.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("royaumes-parallèles")
        .setDescription("Affiche la liste des royaumes parallèles")
        .addStringOption(option => option.setName("nom").setDescription("Le royaume parallèle a afficher").setRequired(false).setChoices(...parallelRealms.map(realm => ({
            name: realm.title,
            value: realm.title,
        })))),
    async execute(interaction) {

        const name = interaction.options.get("nom")?.value as string | undefined;
        if (!name) {
            await Responses.successEmbed(interaction,
                "Royaumes parallèles",
                parallelRealms
                    .map(realm => `- **${realm.title.toUpperCase()}**: *${realm.qualification}*`)
                    .join("\n") + "\n\nPour plus d'informations sur un royaume parallèle, utilisez la commande `/royaumes-parallèles <nom>`",
                !StateService.isInSenseiMode(interaction.user.id));
        } else {
            let parallelRealm = parallelRealms.find(realm => realm.title === name)!;
            await Responses.successEmbed(interaction, parallelRealm.title, `*${parallelRealm.qualification}*\n\n${parallelRealm.description}`);
        }
    }
};

export default command;