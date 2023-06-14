import mongoose from "mongoose";
import databaseConnect from "../database-connect.js";
import VillageModel from "../models/village.model.js";
import BaseModel from "../models/base.model.js";
import RoadModel from "../models/road.model.js";
import ClanModel from "../models/clan.model.js";
import SkillModel from "../models/skill.model.js";
import Village from "../classes/village.class.js";
import Base from "../classes/base.class.js";
import Clan from "../classes/clan.class.js";
import Road from "../classes/road.class.js";
import Skill from "../classes/skill.class.js";
import Rank from "../classes/rank.class";
import RankModel from "../models/rank.model";

export default async function () {

    await databaseConnect;

    const villages: Omit<Village, "_id">[] = [
        {
            name: "Konoha",
            logo: "konoha.svg"
        },
        {
            name: "Suna",
            logo: "suna.svg"
        },
        {
            name: "Kiri",
            logo: "kiri.svg"
        },
        {
            name: "Iwa",
            logo: "iwa.svg"
        },
        {
            name: "Kumo",
            logo: "kumo.svg"
        },
        {
            name: "Kusa",
            logo: "kusa.svg"
        }
    ]
    await VillageModel.insertMany(villages);
    const konohaId = (await VillageModel.findOne({name: "Konoha"}))._id;

    const bases: Omit<Base, "_id">[] = [
        {
            fullName: "Corps",
            shortName: "COR",
            description: "La base Corps (COR) englobe toutes les aptitudes, connaissances et compétences liées au physique d’un personnage comme sa santé, sa mobilité, sa force, sa résilience, son chakra ou sa récupération. C’est l’indicateur principal de son énergie corporelle et définit son score de Vigueur, son Initiative, la moitié de ses dégâts au corps à corps, aux armes, de son score de Chakra et de Contrôle du Chakra.\n" +
                "Favorisant les situations où la vitesse, la durabilité et l’explosivité sont de mise, la base Corps (COR) est essentielle pour chaque personnage se destinant au combat, soit en première ligne soit dans un rôle de soutien."
        },
        {
            fullName: "Esprit",
            shortName: "ESP",
            description: "La Base Esprit (ESP) symbolise les facultés d’apprentissage et de raisonnement d’un personnage. Elle représente la somme des connaissances techniques qu’il possède, sa capacité à résister aux attaques psychiques et son sang froid. Indicateur principal de son énergie spirituelle, la base Esprit (ESP) définit son score de Caractère, la moitié des dégâts de certaines armes, de son score de Chakra et du score de Contrôle du Chakra.\n" +
                "Que ce soit en temps de guerre ou lors d’une mission, chaque ninja doit acquérir, absorber, évaluer et utiliser un flux constant d’informations à son avantage. La base Esprit (ESP) est donc inestimable pour un personnage souhaitant exceller dans les situations d’enquête, les interactions sociales ou les intrigues."
        },
        {
            fullName: "Armes",
            shortName: "ARM",
            description: "La base Armes (ARM) représente l’ensemble des savoirs et des usages communs ou exotiques liés aux armes ainsi que quelques sciences technologiques. Son score permet de calculer le nombre d’interceptions armées qu’un personnage pourra utiliser dans un tour de jeu. Même s’il arrive qu’une arme exotique se nourrisse de chakra, les compétences issues de la base Armes (ARM) ne nécessitent aucune dépense de chakra pour être utilisée.\n" +
                "Alors que tous les ninjas savent se servir d’un kunaï ou d’un shuriken, ceux maîtrisant des techniques exotiques ou non conventionnelles comme les explosifs ou les pièges sont souvent considérés comme une menace très sérieuse. Les personnages qui se spécialisent dans la base Armes (ARM) se surpassent dans des situations stratégiques défensives, dans des contextes technologiques complexes ainsi que dans le combat au corps à corps et à distance."
        },
        {
            fullName: "Taïjutsu",
            shortName: "TAI",
            description: "La base Taïjutsu (TAI), littéralement Techniques du corps, rassemble toutes les écoles pratiquant l’art très ancien du combat à mains nues ainsi qu’un ensemble de disciplines de bluffs et de conduite nécessitant une grande dextérité. Ses compétences sont un mélange de traditions séculaires et de pratiques modernes adaptées à la complexité des missions et des affrontements shinobis. La base Taïjutsu (TAI) sert aussi comme score permettant de calculer le nombre d’interceptions de corps à corps qu’un personnage pourra utiliser dans un tour de jeu.\n" +
                "Les ninjas qui développent une expertise dans l’usage et la pratique du Taïjutsu sont généralement reconnus comme des spécialistes du corps à corps et de la manipulation physique, que ce soit au sol, dans les airs ou en milieu sous-marin. Ces personnages sont redoutables dès lors qu’ils sont en situation de combat : infatigables, stratégiques et très mobiles, ils sont rarement touchés par les attaques physiques et peuvent facilement rester au contact de leurs adversaires."
        },
        {
            fullName: "Ninjutsu",
            shortName: "NIN",
            description: "La base Ninjutsu (NIN), littéralement Techniques ninjas, représente un ensemble conséquent de disciplines incontournable du monde shinobi. Aussi appelé Art Ninja, dans sa forme la plus simple le ninjutsu n’est autre que l’empathie d’un personnage avec son environnement immédiat et sa capacité à en tirer partie, soit sous forme matérielle, soit sous forme spirituelle grâce à son chakra. La base Ninjutsu (NIN) rassemble donc des compétences nombreuses et très diverses, de l’infiltration à l’empathie animale ou végétale, des natures de chakra élémentaires aux drogues et poisons, etc.\n" +
                "Naturellement, tous les aspirants de l’Académie sont formés à ses usages les plus communs que sont les techniques de camouflage, de survie et de vigilance ainsi que la nature de chakra Henge. Cependant le ninjutsu est tellement vaste qu’un ninja pourrait passer sa vie à en étudier qu’une petite partie. Incroyable pourvoyeur de spécialités, la base Ninjutsu (NIN) est donc pour un personnage une source infinie d’options pouvant renforcer son profil, lui donner des avantages stratégiques importants ou ouvrir des capacités de création très puissantes."
        },
        {
            fullName: "Genjutsu",
            shortName: "GEN",
            description: "La base Genjutsu (GEN), littéralement Techniques d’illusions, réunit un ensemble d’arts illusoires et de compétences très spécialisées célèbres pour terrifier la grande majorité des ninjas en service. Un spécialiste du genjutsu, au sacrifice de sa mobilité immédiate, prend le contrôle du chakra situé au niveau du cerveau de son adversaire pour lui faire expérimenter mirages et manipulations psychiques, émotionnels ou mémoriels. Le genjutsu englobe aussi les formes multiples de sceaux célestes, des compétences sensorielles ainsi que les capacités de transfert de chakra, de permutation et de transmutation. C’est un conglomérat de disciplines puissantes que peu de ninjas maîtrisent mais que beaucoup redoutent. Un personnage qui approfondit le genjutsu voit s’ouvrir à lui des usages très spécialisés et des effets rares ou exotiques. Il ou elle sera performant dans des environnements d’infiltration et d’enquête, dans la gestion stratégique des affrontements ou dans des rôles de support très versatiles."
        },
        {
            fullName: "Lignée",
            shortName: "LIG",
            description: "La base Lignée (LIGN) symbolise le patrimoine génétique spécifique d’un personnage et sa capacité à le transformer en source de puissance ou d’influence. Générations après générations, siècles après siècles, un ensemble de clans du continent ont réussi à créer des pouvoirs surhumains par des modifications génétiques interdites, des substances très dangereuses ou grâce à des contrats plus ou moins douteux avec des forces surnaturelles, occultes ou mythiques. Chaque ninja possède ainsi dans ses gènes le potentiel héréditaire de sa famille, qui se manifeste sous forme de techniques très rares ou inédites, de prédispositions à un type de compétences ou des attributs physiques ou psychiques inhumains.\n" +
                "La Lignée est liée au clan que chaque joueur et chaque joueuse choisit pour son personnage dans le Chapitre 3 — Créer un personnage. Elle ne peut pas être interchangée ou modifiée. Lorsqu’un personnage progresse et augmente sa Lignée, il obtient de nouveaux pouvoirs et ses supérieurs hiérarchiques ainsi que les membres de sa famille considèrent qu’il révèle son sang, se montrant ainsi digne de son héritage.\n" +
                "La base Lignée (LIGN) est aussi l’indicateur du nombre total d’actions de Lignée qu’un personnage pourra utiliser lors d’une session de jeu."
        }
    ]
    await BaseModel.insertMany(bases);
    const basesId: mongoose.Types.ObjectId[] = [];
    for (const base of bases) {
        basesId.push(await BaseModel.findOne({fullName: base.fullName}));
    }

    const roads: Omit<Road, "_id">[] = [
        {
            name: "Shōkan-shi",
            longName: "Voie du Genjutsu"
        },
        {
            name: "Ninpō",
            longName: "Voie du Ninjutsu"
        },
        {
            name: "Kriegstier",
            longName: "Voie des Armes"
        },
        {
            name: "Kugutsu",
            longName: "Voie du Marionnettiste"
        },
        {
            name: "Hachimon",
            longName: "Voie du Taïjutsu"
        }
    ]
    await RoadModel.insertMany(roads);

    const clans: Omit<Clan, "_id">[] = [
        {
            name: "Aburame",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Akaba",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Akimichi",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Aniki",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Ao",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Eshimuro",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Hyūga",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Inuzuka",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Ishida",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Kagayaki",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Katō",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Kenta",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Kurama",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Mitokado",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Morino",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Munefuda",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Nara",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Sarutobi",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Senju",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Shimadoku",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Shimura",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Takeda",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Uchiha",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Utatane",
            village: konohaId,
            description: "TODO"
        },
        {
            name: "Yamanaka",
            village: konohaId,
            description: "TODO"
        },
    ]
    await ClanModel.insertMany(clans);

    const skills: (Omit<Skill, "_id"> | Omit<Skill, "_id" | "isClan">)[] = [
        {
            name: "Armes Simples",
            isCommon: true,
            base: basesId[2],
            description: "TODO"
        },
        {
            name: "Camouflage",
            isCommon: true,
            base: basesId[4],
            description: "TODO"
        },
        {
            name: "Corps à Corps",
            isCommon: true,
            base: basesId[3],
            description: "TODO"
        },
        {
            name: "Esquive",
            isCommon: true,
            base: basesId[3],
            description: "TODO"
        },
        {
            name: "Gensou",
            isCommon: true,
            base: basesId[5],
            description: "TODO"
        },
        {
            name: "Henge",
            isCommon: true,
            base: basesId[4],
            description: "TODO"
        },
        {
            name: "Kawarimi",
            isCommon: true,
            base: basesId[5],
            description: "TODO"
        },
        {
            name: "Mental",
            isCommon: true,
            base: basesId[1],
            description: "TODO"
        },
        {
            name: "Parade",
            isCommon: true,
            base: basesId[2],
            description: "TODO"
        },
        {
            name: "Physique",
            isCommon: true,
            base: basesId[0],
            description: "TODO"
        },
        {
            name: "Survie",
            isCommon: true,
            base: basesId[4],
            description: "TODO"
        },
        {
            name: "Vigilance",
            isCommon: true,
            base: basesId[4],
            description: "TODO"
        },
    ]
    await SkillModel.insertMany(skills);

    const ranks: Omit<Rank, "_id">[] = [
        {
            name: "Cadet"
        },
        {
            name: "Genin",
        },
        {
            name: "Chūnin",
        },
        {
            name: "Jōnin",
        },
        {
            name: "Sensei"
        },
        {
            name: "Sanin"
        },
        {
            name: "Kage",
        }
    ]
    await RankModel.insertMany(ranks);
}