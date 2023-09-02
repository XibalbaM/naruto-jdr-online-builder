import {ActionRowBuilder, ButtonBuilder, SlashCommandBuilder} from "discord.js";
import Responses from "../utils/responses.utils.js";
import {ButtonStyle, SlashCommand} from "../classes.js";
import skills from "../datas/skills.js";
import StateService from "../services/state.service.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("compétences")
        .setDescription("Donne la liste des compétences")
        .addStringOption(option => option.setName("type").setDescription("Le type de compétences à afficher").setRequired(false).setChoices(...Object.keys(skills).map(type => ({name: type, value: type})))),
    async execute(interaction) {

        const type = interaction.options.get("type")?.value;
        if (!type) {
            const buttons = new ActionRowBuilder().addComponents(Object.keys(skills).map(type => new ButtonBuilder().setCustomId(type).setLabel(type).setStyle(ButtonStyle.PRIMARY)));
            const message = await Responses.successEmbed(interaction,
                "Liste des compétences",
                Object.keys(skills)
                    .map(value => `### - ${value.toUpperCase()}\n${Object
                        .keys(skills[value as keyof typeof skills])
                        .map(skill => skill.substring(0, skill.indexOf("(") - 1) + skill.substring(skill.indexOf(")") + 1))
                        .join(", ")}`)
                    .join("\n"),
                !StateService.isInSenseiMode(interaction.user.id),
                [buttons]);
            message.createMessageComponentCollector({time: 60000}).on("collect", async i => {
                const pressedButton = i.customId;
                await i.deferUpdate();
                await Responses.replaceSuccessEmbed(interaction, "Liste des " + pressedButton, Object.keys(skills[pressedButton as keyof typeof skills]).map(value => `### - ${value.toUpperCase()}\n${skills[pressedButton as keyof typeof skills][value as keyof typeof skills[keyof typeof skills]]}`).join("\n"));
            });
        } else {
            await Responses.successEmbed(interaction, "Liste des " + type, Object.keys(skills[type as keyof typeof skills]).map(value => `### - ${value.toUpperCase()}\n${skills[type as keyof typeof skills][value as keyof typeof skills[keyof typeof skills]]}`).join("\n"), !StateService.isInSenseiMode(interaction.user.id));
        }
    }
};

export default command;