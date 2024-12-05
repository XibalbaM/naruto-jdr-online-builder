import Character from "../models/character.model.js";
import {findById} from "./data.utils.js";
import DataService from "../services/data.service.js";
import {GuildMember} from "discord.js";
import {RollResult} from "./dice.utils.js";
import {interceptions, maxChakra} from "naruto-jdr-online-builder-common/src/utils/character.utils.js";

/**
 * Class containing messages texts. Grouped here so they can easily be changed.
 */
export default class Messages {

    static DICE = {
        INVALID_INPUT: "La formule n'est pas valide.",
        D: "https://tenor.com/view/gad-elmaleh-r%C3%A9ponse-d-qui-veut-gagner-des-millions-gif-19797483",
	    SUCCESS: (input: string, result: number, details: string | undefined, username: string, label: string | null) =>
            (label ? `Jet de ${username} [${label}]` : `Jet de ${username}`) +
            ` :\nJet : \`[${input}]\`${details ? `Détails : \`${details}\`` : ""} Résultat : \`${result}\``,
        LIGHT(result: number, characterName: string, label: string | null) {
            if (label) {
                return `Jet de ${label} de ${characterName} : ${result}`;
            } else {
                return `Jet de ${characterName} : ${result}`;
            }
        }
    }

    static LINKING = {
        NO_ACCOUNT_LINKED: "Votre compte discord n'est pas encore lié à un compte en ligne. Vous pouvez le lier avec la commande `/connexion`.",
        ACCOUNT_ALREADY_LINKED: "Votre compte discord est déjà lié à un compte en ligne. Vous pouvez le délier avec la commande `/déconnexion` ou via la page de profile sur notre site.",
        LINK_WITHOUT_ACCOUNT: "Vous n’avez pas encore de compte sur notre application.\nLier votre profile discord à l’application entraine une création de compte automatique.",
        LINK_WITHOUT_ACCOUNT_CANCELED: "Ok, vous pouvez créer un compte à tout moment en utilisant la commande `/connexion` !",
        OTHER_DISCORD_ACCOUNT_ALREADY_LINKED: "Ce compte en ligne est déjà lié à un compte discord. Si vous voulez connecter ce compte discord à la place, veuillez d'abord déconnecter l'autre compte via le site ou en utilisant la commande `/déconnexion` depuis l'autre compte.",
        EMAIL_SENT: (email: string) => "Un email de vérification a bien été envoyé à l'adresse " + email + ". Pensez à vérifier vos spams !",
        EMAIL_ALREADY_SENT: "Un email a déjà été envoyé à cette adresse. Veuillez vérifier vos spams, ou patienter quelques minutes avant de réessayer",
        UNLINKED: "Votre compte discord a été délié de votre compte en ligne.",
        UNLINK_FAILED: "Une erreur est survenue lors de la déconnexion de votre compte discord.",
        STATUS: (linked: boolean) => linked ? "Votre compte discord est bien lié à un compte en ligne." : "Votre compte discord n'est pas lié à un compte en ligne.",
    }

    static GROUPS = {
        LIST: (groups: string[]) => `Vous êtes dans les groupes suivants : ${groups.map((group, i) => `\n${i++}. ` + group).join()}`,
        GROUP_NOT_FOUND: "Le groupe n'a pas été trouvé.",
        SELECTED: (group: string) => `Le groupe ${group} a bien été sélectionné.`,
        WAS_SELECTED: (group: string) => `Le groupe sélectionné est ${group}.`,
        NO_SELECTED_GROUP: "Aucun groupe n'est sélectionné.",
    }

    static ERRORS = {
        INVALID_EMAIL: "L'adresse email que vous avez entrée n'est pas valide.",
        UNKNOWN: "Une erreur inconnue est survenue. Veuillez réessayer ou, si l'erreur persiste, contactez <@569895047026180135>.",
        NOT_IMPLEMENTED: "Cette commande n'est pas encore implémentée.",
    }

    static IMAGES = {
        MAP: {title: "Carte du monde", url: "./assets/map.webp"}
    }

    static CHARACTER = {
        NO_CHARACTER: "Aucun personnage n'a été trouvé.",
        CHARACTERS_LIST: (characters: {name: string, xp: number}[]) => `Voici la liste de vos personnages : ${characters.map((character, i) => `\n${i++}. ${character.name} (${character.xp} XP)`).join()}\nCliquez sur l'un d'entre eux pour le sélectionner.`,
        CHARACTER_SELECTED: (name: string) => `Le personnage ${name} a bien été sélectionné.`,
        NO_SELECTED_CHARACTER: "Aucun personnage n'est sélectionné.",
        CHARACTER_INFO: (character: Character) => {
            let message = `Voici les informations sur le personnage ${character.firstName} :\n`;
            message += `Clan : ${findById(DataService.clans, character.clan)?.name}\n`;
            message += `Village : ${findById(DataService.villages, character.village)?.name}\n`;
            if (character.road) message += `Voie : ${findById(DataService.roads, character.road)?.name}\n`;
            message += `XP : ${character.xp}\n`;
            message += `Grade : ${findById(DataService.ranks, character.rank)?.name}\n`;
            message += `Nindô : ${character.nindo}\n`;
            message += `Points de nindô : ${character.nindoPoints}\n`;
            message += `Modifié le : <t:${Math.floor(Date.parse(character.updatedAt as unknown as string)/1000)}:R>\n`;
            return message;
        },
        BASES(character: Character) {
            let message = `Voici les bases du personnage ${character.firstName} :\n`;
            character.bases.forEach((base, index) => {
                message += `- ${findById(DataService.bases, index)?.fullName} : ${base}\n`;
            });
            return message;
        },
        COMMON_SKILLS(character: Character) {
            let message = `Voici les compétences communes du personnage ${character.firstName} :\n`;
            character.commonSkills.forEach((level, index) => {
                let skill = findById(DataService.commonSkills, index);
                message += `- ${skill?.name} (${findById(DataService.bases, skill!.base)?.shortName}) : ${level} (Total : ${level + character.bases[skill?.base ?? 0]})\n`;
            });
            return message;
        },
        CUSTOM_SKILLS(character: Character) {
            let message = `Voici les compétences personnalisées du personnage ${character.firstName} :\n`;
            character.customSkills.forEach((skillData) => {
                let skill = findById(DataService.customSkills, skillData.skill);
                message += `- ${skill?.name} (${findById(DataService.bases, skill!.base)?.shortName}) : ${skillData.level} (Total : ${skillData.level + character.bases[skill?.base ?? 0]})\n`;
            });
            return message;
        },
        SPES(character: Character) {
            let message = `Voici les spécialités de chakra du personnage ${character.firstName} :\n`;
            character.chakraSpes.forEach((spe) => {
                message += `- ${findById(DataService.spes, spe)?.name}\n`;
            });
            return message;
        },
        NEW_TURN_SUMMARY(character: Character) {
            return `Interceptions : ARM ${interceptions(character, "ARM", DataService.bases)} / TAI ${interceptions(character, "TAI", DataService.bases)}\n`
                + `Chakra : ${maxChakra(character, DataService.clans, DataService.spes)}\n`
                + `Nindo : ${character.nindoPoints}`; //TODO add active chakra, nindo
        },
        NOTES(character: Character) {
            return `Voici les notes du personnage ${character.firstName} :\n${character.notes}`;
        }
    }

    static SKILLS = {
        SKILL_NOT_FOUND: "La compétence n'a pas été trouvée.",
    }

    static INITIATIVE = {
        NO_INITIATIVE: "Aucune initiative n'a été enregistrée. Pour lancer une initiative, utilisez la commande `/initiative`.",
        LIST: (initiatives: {name: string, score: number}[]) => {
            initiatives.sort((a, b) => b.score - a.score);
            let groupedInitiatives = new Map<number, string[]>();
            initiatives.forEach(initiative => {
                if (!groupedInitiatives.has(initiative.score)) {
                    groupedInitiatives.set(initiative.score, []);
                }
                groupedInitiatives.get(initiative.score)!.push(initiative.name);
            });
            let message = "Voici les initiatives dans l'ordre :\n";
            groupedInitiatives.forEach((names, score) => {
                message += `- **${score}** : ${names.join(", ")}\n`;
            });
            return message;
        },
        CLEARED: "Les initiatives ont bien été effacées.",
        NO_PNJS: "Aucun PNJ n'a été configuré. Pour configurer des PNJs, utilisez la commande `/initiative-pnj configurer`.",
        PNJS_ROLLED: (rolls: {name: string, roll: RollResult}[], username: string) => {
            rolls.sort((a, b) => b.roll.result - a.roll.result);
            let message = `Voici les initiatives des PNJs de ${username} :\n`;
            rolls.forEach(roll => {
                message += `- **${roll.roll.result}** (${roll.roll.details}) : ${roll.name}\n`;
            });
            return message;
        },
        PNJ_ADDED: (name: string, initiative: number) => `Le PNJ ${name} a bien été ajouté à la liste des PNJs avec une initiative de ${initiative}.`,
        PNJ_REMOVED: (name: string) => `Le PNJ ${name} a bien été retiré de la liste des PNJs.`,
        PNJS_LIST: (pnjs: {name: string, initiative: number}[]) => {
            let sorted = pnjs.sort((a, b) => b.initiative - a.initiative);
            let message = "Voici la liste des PNJs configurés :\n";
            for (let pnj of sorted) {
                message += `- **${pnj.name}** : ${pnj.initiative}\n`;
            }
            return message;
        },
        PNJ_ALREADY_EXISTS: (name: string) => `Le PNJ ${name} est déjà configuré.`,
        PNJ_CLEAR_CONFIRM: "Êtes-vous sûr de vouloir effacer la liste des PNJs configurés ?",
        PNJ_CLEARED: "La liste des PNJs configurés a bien été effacée.",
        PNJ_CLEAR_CANCEL: "La liste des PNJs configurés n'a pas été effacée.",
        PNJS_ROLLED_LIGHT(rolls: { name: string; roll: RollResult }[], username: string) {
            rolls.sort((a, b) => b.roll.result - a.roll.result);
            let message = `Voici les initiatives des PNJs de ${username} :\n`;
            rolls.forEach(roll => {
                message += `- **${roll.roll.result}** : ${roll.name}\n`;
            });
            return message;
        }
    }

    static EASTER_EGG = "Vous avez trouvé un easter egg !";

    static SENSEI_MODE_CHANGED(newSenseiMode: boolean) {
        return `Le mode sensei est maintenant ${newSenseiMode ? "activé" : "désactivé"}.`;
    }

    static SENSEI_MODE_NOT_CHANGED(senseiMode: boolean) {
        return `Le mode sensei est déjà ${senseiMode ? "activé" : "désactivé"}.`;
    }

    static SENSEI_MODE_NOT_ACTIVATED = "Vous devez être en mode sensei pour utiliser cette commande.";

    static NO_PERMISSION(name: string) {
        return `Vous avez besoin de la permission "${name}".`;
    }

    static WELCOME(member: GuildMember) {
        return `Hello <@${member.user.id}> bienvenue parmi nous :slight_smile:
Les infos sur le serveur et notre charte sont dans le canal <#532699779155886100> :sunglasses: 
On organise des initiations tous les mois / deux mois pour présenter le jeu, ça s'organise dans <#709169837183729664> ⁠ ⁠ ⁠ ⁠  ⁠ ⁠ ⁠ ⁠ ⁠
Si tu décides de participer, préviens nous au plus tôt en cas d'empêchement, que quelqu'un d'autre puisse jouer.
A côté de ça, tu peux explorer :
- des actual plays sur Youtube : https://www.youtube.com/@narutojdr
- Ninjadex, notre plateforme de création / d'évolution de perso (en alpha) : https://builder.naruto-jdr.com/
- les campagnes en cours, en obs (les dates des sessions sont dans la section événement du serveur !)`;
    }
}