import express, {Router} from 'express';
import path from 'path';

import authRoute from './routes/auth.route.js';
import accountRoute from "./routes/account.route.js";
import groupsRoute from "./routes/groups.route.js";
import discordRoute from "./routes/discord.route.js";
import dataRoute from "./routes/data.route.js";
import VillageModel from "./models/village.model.js";
import BaseModel from "./models/base.model.js";
import RoadModel from "./models/road.model.js";
import {CommonSkillModel, CustomSkillModel} from "./models/skill.model.js";
import ClanModel from "./models/clan.model.js";
import RankModel from "./models/rank.model.js";
import ChakraSpeModel from "./models/chakraSpe.model.js";
import charactersRoute from "./routes/characters.route.js";
import predrawnRoute from "./routes/predrawn.route.js";
import adminRoute from "./routes/admin.route.js";
import authMiddleware from "./middlewares/security/auth.middleware.js";
import adminMiddleware from "./middlewares/security/admin.middleware.js";

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
router.use('/admin', authMiddleware(), adminMiddleware(), adminRoute)
router.use('/villages', await dataRoute(VillageModel));
router.use('/bases', await dataRoute(BaseModel));
router.use('/roads', await dataRoute(RoadModel));
router.use('/skills/common', await dataRoute(CommonSkillModel));
router.use('/skills/custom', await dataRoute(CustomSkillModel));
router.use('/clans', await dataRoute(ClanModel));
router.use('/ranks', await dataRoute(RankModel));
router.use('/chakraSpes', await dataRoute(ChakraSpeModel));
router.use('/assets', express.static(path.resolve('assets'), {
    maxAge: 1000 * 60 * 60 * 24 * 3,
    etag: true,
    lastModified: true
}));

export default router;