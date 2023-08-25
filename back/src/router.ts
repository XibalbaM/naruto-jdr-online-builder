import express, {Router} from 'express';
import path from 'path';

import authRoute from './routes/auth.route.js';
import accountRoute from "./routes/account.route.js";
import groupsRoute from "./routes/groups.route.js";
import discordRoute from "./routes/discord.route.js";
import dataRoute from "./routes/data.route.js";
import VillageModel from "./models/village.model.js";
import Village from "./classes/village.class.js";
import BaseModel from "./models/base.model.js";
import Base from "./classes/base.class.js";
import RoadModel from "./models/road.model.js";
import Road from "./classes/road.class.js";
import Skill from "./classes/skill.class.js";
import SkillModel from "./models/skill.model.js";
import ClanModel from "./models/clan.model.js";
import Clan from "./classes/clan.class.js";
import RankModel from "./models/rank.model.js";
import Rank from "./classes/rank.class.js";
import ChakraSpeModel from "./models/chakraSpe.model.js";
import ChakraSpe from "./classes/chakraSpe.class.js";
import charactersRoute from "./routes/characters.route.js";
import predrawnRoute from "./routes/predrawn.route.js";

/**
 * The main router of the api.
 *
 * Redirects to the different routers of the api.
 * @type {Router}
 */
const router = Router();

router.use('/auth', authRoute);
router.use('/account', accountRoute);
router.use('/groups', groupsRoute);
router.use('/discord', discordRoute);
router.use('/characters', charactersRoute);
router.use('/predrawn', predrawnRoute);
router.use('/villages', await dataRoute(VillageModel, Village.fromModel));
router.use('/bases', await dataRoute(BaseModel, Base.fromModel));
router.use('/roads', await dataRoute(RoadModel, Road.fromModel));
router.use('/skills', await dataRoute(SkillModel, Skill.fromModel));
router.use('/clans', await dataRoute(ClanModel, Clan.fromModel));
router.use('/ranks', await dataRoute(RankModel, Rank.fromModel));
router.use('/chakraSpes', await dataRoute(ChakraSpeModel, ChakraSpe.fromModel));
router.use('/assets', express.static(path.resolve('assets'), {
    maxAge: 1000 * 60 * 60 * 24 * 3,
    etag: true,
    lastModified: true
}));

export default router;