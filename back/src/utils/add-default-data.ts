import databaseConnect from "../database-connect.js";
import VillageModel from "../models/village.model.js";
import BaseModel from "../models/base.model.js";
import RoadModel from "../models/road.model.js";
import ClanModel from "../models/clan.model.js";
import Village from "../interfaces/village.interface.js";
import Clan from "../interfaces/clan.interface.js";
import Road from "../interfaces/road.interface.js";
import CustomSkill from "../interfaces/skill.interface.js";
import Rank from "../interfaces/rank.interface.js";
import RankModel from "../models/rank.model.js";
import ChakraSpe from "../interfaces/chakraSpe.interface.js";
import ChakraSpeModel from "../models/chakraSpe.model.js";
import {CommonSkillModel, CustomSkillModel} from "../models/skill.model.js";
import Base from "naruto-jdr-online-builder-common/src/interfaces/base.interface";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";

export default async function () {

    await databaseConnect;
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

    const addVillages = async () => {
        const villages: Omit<Village, "_id">[] = [
            {
                name: "Konoha"
            },
            {
                name: "Suna"
            },
            {
                name: "Kiri"
            },
            {
                name: "Iwa"
            },
            {
                name: "Kumo"
            },
            {
                name: "Kusa"
            }
        ]
        if (await VillageModel.countDocuments() > 0)
            await VillageModel.collection.drop();
        await VillageModel.insertMany(villages);
    }

    const addBases = async () => {
        if (await BaseModel.countDocuments() > 0)
            await BaseModel.collection.drop();
        await BaseModel.insertMany(bases.map((value, index) => ({...value, _id: index})));
    }

    const addSkills = async () => {
        const commonSkills: Omit<Skill, "_id">[] = [
            {
                name: "Armes Simples",
                base: 2,
                description: "Arrive bientôt"
            },
            {
                name: "Camouflage",
                base: 4,
                description: "Arrive bientôt"
            },
            {
                name: "Corps à Corps",
                base: 3,
                description: "Arrive bientôt"
            },
            {
                name: "Esquive",
                base: 3,
                description: "Arrive bientôt"
            },
            {
                name: "Gensou",
                base: 5,
                description: "Arrive bientôt"
            },
            {
                name: "Henge",
                base: 4,
                description: "Arrive bientôt"
            },
            {
                name: "Kawarimi",
                base: 5,
                description: "Arrive bientôt"
            },
            {
                name: "Mental",
                base: 1,
                description: "Arrive bientôt"
            },
            {
                name: "Parade",
                base: 2,
                description: "Arrive bientôt"
            },
            {
                name: "Physique",
                base: 0,
                description: "Arrive bientôt"
            },
            {
                name: "Survie",
                base: 4,
                description: "Arrive bientôt"
            },
            {
                name: "Vigilance",
                base: 4,
                description: "Arrive bientôt"
            }
        ]
        if (await CommonSkillModel.countDocuments() > 0)
            await CommonSkillModel.collection.drop();
        await CommonSkillModel.insertMany(commonSkills.map((value, index) => ({...value, _id: index})));
        const customSkills: Omit<CustomSkill, "_id">[] = [
            // Combat
            {
                name: "Armes exotiques",
                base: 2,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Chūken",
                base: 3,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Coup spécial",
                base: 2,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Coup spécial",
                base: 3,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Doton",
                base: 4,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Futon",
                base: 4,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Gōken",
                base: 3,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Jūken",
                base: 3,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Intimidation",
                base: 0,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Katon",
                base: 4,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Premiers soins",
                base: 0,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Raïton",
                base: 4,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Régénération",
                base: 0,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Résistances Élémentaires",
                base: 4,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Résistances Environnementales",
                base: 0,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Résistances Physiques",
                base: 0,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Résistances Psychiques",
                base: 1,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Science des Explosifs",
                base: 2,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Science des Pièges",
                base: 2,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Suiton",
                base: 4,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            {
                name: "Yūryoku",
                base: 5,
                description: "Arrive bientôt",
                type: "combat",
                villages: []
            },
            // Terrain
            {
                name: "Collecter des informations",
                base: 1,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Éducation",
                base: 1,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Empathie",
                base: 4,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Faux Semblants",
                base: 5,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Fūin",
                base: 5,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Iryō",
                base: 5,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Kuchiyose",
                base: 5,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Lois et Traditions",
                base: 1,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Manipulation",
                base: 3,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Médecine",
                base: 1,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Science des Drogues",
                base: 4,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Science des Poisons",
                base: 4,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Sentinelle",
                base: 5,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Sixième Sens",
                base: 5,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            {
                name: "Technologie",
                base: 2,
                description: "Arrive bientôt",
                type: "terrain",
                villages: []
            },
            // Clan
            {
                name: "Jiton",
                base: 4,
                description: "Arrive bientôt",
                type: "clan",
                villages: []
            },
            {
                name: "Kage",
                base: 4,
                description: "Arrive bientôt",
                type: "clan",
                villages: []
            },
            {
                name: "Kikaichū",
                base: 4,
                description: "Arrive bientôt",
                type: "clan",
                villages: []
            },
            {
                name: "Mokuton",
                base: 4,
                description: "Arrive bientôt",
                type: "clan",
                villages: []
            },
            {
                name: "Résistances Émotionnelles",
                base: 5,
                description: "Arrive bientôt",
                type: "clan",
                villages: []
            },
            {
                name: "Sumi",
                base: 4,
                description: "Arrive bientôt",
                type: "clan",
                villages: []
            }
        ]
        if (await CustomSkillModel.countDocuments() > 0)
            await CustomSkillModel.collection.drop();
        await CustomSkillModel.insertMany(customSkills);
    }

    const addRoads = async () => {
        const roads: Omit<Road, "_id">[] = [
            {
                name: "Shōkan-shi",
                qualification: "Voie du Genjutsu",
                line: {
                    skills: [
                        (await CustomSkillModel.findOne({name: "Yūryoku"}).lean().select("_id"))!._id.toString()
                    ]
                }
            },
            {
                name: "Ninpō",
                qualification: "Voie du Ninjutsu",
                line: {
                    skills: []
                }
            },
            {
                name: "Kriegstier",
                qualification: "Voie des Armes",
                line: {
                    skills: [
                        (await CustomSkillModel.findOne({name: "Armes exotiques"}).lean().select("_id"))!._id.toString()
                    ]
                }
            },
            {
                name: "Kugutsu",
                qualification: "Voie du Marionnettiste",
                line: {
                    skills: []
                }
            },
            {
                name: "Hachimon",
                qualification: "Voie du Taïjutsu",
                line: {
                    skills: []
                }
            }
        ]
        if (await RoadModel.countDocuments() > 0)
            await RoadModel.collection.drop();
        await RoadModel.insertMany(roads);
    }

    const addClans = async () => {
        const konohaId = (await VillageModel.findOne({name: "Konoha"}).lean().select("_id"))!._id.toString();
        const clans: Omit<Clan, "_id">[] = [
            {
                name: "Aburame",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: [
                        (await CustomSkillModel.findOne({name: "Kikaichū"}).lean().select("_id"))!._id.toString()
                    ]
                }
            },
            {
                name: "Akaba",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Akimichi",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Aniki",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: [
                        (await CustomSkillModel.findOne({name: "Sumi"}).lean().select("_id"))!._id.toString()
                    ]
                }
            },
            {
                name: "Ao",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Eshimuro",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Hyūga",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Inuzuka",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Ishida",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Kagayaki",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Katō",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Kenta",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Kurama",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Mitokado",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Morino",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Munefuda",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: [
                        (await CustomSkillModel.findOne({name: "Jiton"}).lean().select("_id"))!._id.toString()
                    ]
                }
            },
            {
                name: "Nara",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: [
                        (await CustomSkillModel.findOne({name: "Kage"}).lean().select("_id"))!._id.toString()
                    ]
                }
            },
            {
                name: "Sarutobi",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Senju",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: [
                        (await CustomSkillModel.findOne({name: "Mokuton"}).lean().select("_id"))!._id.toString(),
                        (await CustomSkillModel.findOne({name: "Doton"}).lean().select("_id"))!._id.toString(),
                        (await CustomSkillModel.findOne({name: "Suiton"}).lean().select("_id"))!._id.toString()
                    ]
                }
            },
            {
                name: "Shimadoku",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Shimura",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Takeda",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Uchiha",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Utatane",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: []
                }
            },
            {
                name: "Yamanaka",
                village: konohaId,
                description: "Arrive bientôt",
                line: {
                    skills: [
                        (await CustomSkillModel.findOne({name: "Résistances Émotionnelles"}).lean().select("_id"))!._id.toString()
                    ]
                }
            },
        ]
        if (await ClanModel.countDocuments() > 0)
            await ClanModel.collection.drop();
        await ClanModel.insertMany(clans);
    }

    const addRanks = async () => {
        const ranks: Omit<Rank, "_id">[] = [
            {
                name: "Cadet",
                minXp: -1,
                maxBase: 3
            },
            {
                name: "Genin, rang D",
                minXp: 0,
                maxBase: 5
            },
            {
                name: "Genin, rang C",
                minXp: 200,
                maxBase: 5
            },
            {
                name: "Genin, rang B",
                minXp: 400,
                maxBase: 5
            },
            {
                name: "Genin, rang A",
                minXp: 600,
                maxBase: 5
            },
            {
                name: "Chūnin, rang D",
                minXp: 700,
                maxBase: 7
            },
            {
                name: "Chūnin, rang C",
                minXp: 1000,
                maxBase: 7
            },
            {
                name: "Chūnin, rang B",
                minXp: 1300,
                maxBase: 7
            },
            {
                name: "Chūnin, rang A",
                minXp: 1600,
                maxBase: 7
            },
            {
                name: "Jōnin, rang D",
                minXp: 1700,
                maxBase: 10
            },
            {
                name: "Jōnin, rang C",
                minXp: 2200,
                maxBase: 10
            },
            {
                name: "Jōnin, rang B",
                minXp: 2700,
                maxBase: 10
            },
            {
                name: "Jōnin, rang A",
                minXp: 3200,
                maxBase: 10
            },
            {
                name: "Sensei",
                minXp: 4500,
                maxBase: 12
            },
            {
                name: "Sanin",
                minXp: 6500,
                maxBase: 14
            },
            {
                name: "Kage",
                minXp: 8500,
                maxBase: 16
            }
        ]
        if (await RankModel.countDocuments() > 0)
            await RankModel.collection.drop();
        await RankModel.insertMany(ranks);
    }

    const addChakraSpes = async () => {
        const chakraSpes: Omit<ChakraSpe, "_id">[] = [
            {
                name: "Acéré",
                max: 5,
                effect: "+{{1}} dégâts Armes"
            },
            {
                name: "Colossal",
                max: 9,
                effect: "+{{100}} points de chakra"
            },
            {
                name: "Endurci",
                max: 5,
                effect: "+{{1}} Vigueur, +{{50}} points de chakra"
            },
            {
                name: "Explosif",
                max: 5,
                effect: "+{{2}} dégâts Taïjutsu"
            },
            {
                name: "Fulgurant",
                max: 5,
                effect: "+{{2}} Initiative, +{{10}}m supplémentaire au Déplacement Simple dans un tour"
            },
            {
                name: "Héréditaire",
                max: 3,
                effect: "+{{1}} utilisation de pouvoir de lignée actif supplémentaire par session"
            },
            {
                name: "Impérieux",
                max: 5,
                effect: "+{{1}} Caractère, +{{50}} points de chakra"
            },
            {
                name: "Inépuisable",
                max: 3,
                effect: "+{{1}}% à la régénération"
            },
            {
                name: "Puissant",
                max: 1,
                effect: "Annule les paliers de réserve naturelle de chakra et les échecs automatiques liés aux Blessures"
            },
            {
                name: "Rémanent",
                max: 1,
                effect: "Le chakra appliqué en petite quantité sur un objet ne disparaît pas et reste actif tant qu’un personnage le souhaite"
            }
        ]
        if (await ChakraSpeModel.countDocuments() > 0)
            await ChakraSpeModel.collection.drop();
        await ChakraSpeModel.insertMany(chakraSpes);
    }

    switch (process.env["MODEL"]) {
        case "village": {
            await addVillages();
            break;
        }
        case "base": {
            await addBases();
            break;
        }
        case "skill": {
            await addSkills();
            break;
        }
        case "road": {
            await addRoads();
            break;
        }
        case "clan": {
            await addClans();
            break;
        }
        case "rank": {
            await addRanks();
            break;
        }
        case "chakraSpe": {
            await addChakraSpes();
            break;
        }
        case "all": {
            await addVillages();
            await addBases();
            await addSkills();
            await addRoads();
            await addClans();
            await addRanks();
            await addChakraSpes();
            break;
        }
    }
}