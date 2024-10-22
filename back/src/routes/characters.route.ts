import {Router} from "express";
import authMiddleware from "../middlewares/security/auth.middleware.js";
import * as charactersController from "../controllers/characters.controller.js";
import contentMiddleware from "../middlewares/content.middleware.js";
import idOfMiddleware from "../middlewares/id-of.middleware.js";
import CharacterModel from "../models/character.model.js";
import {CommonSkillModel, CustomSkillModel} from "../models/skill.model.js";
import BaseModel from "../models/base.model.js";
import captchaMiddleware from "../middlewares/security/captcha.middleware.js";
import RankModel from "../models/rank.model.js";
import VillageModel from "../models/village.model.js";
import ClanModel from "../models/clan.model.js";

/**
 * The router for the /character path.
 * @type {Router}
 */
const router = Router();

router.post('/', captchaMiddleware(), authMiddleware(), contentMiddleware({
	character: {
		notes: "string",
		firstName: "string",
		clan: "string",
		village: "string",
		xp: 42,
        rank: "string",
		nindo: "string",
        shareStatus: "string"
    }, captcha: "string"
}, {
    character: {
        notes: "string",
        firstName: "string",
        clan: "string",
        village: "string",
        xp: 42,
        rank: "string",
        nindo: "string",
        road: "string",
        shareStatus: "string"
    }, captcha: "string"
}), charactersController.create);
router.get('/', authMiddleware(), charactersController.getCharacters);
router.get('/:id', authMiddleware(), idOfMiddleware(CharacterModel, "id"), charactersController.getCharacter);
router.put('/:id', authMiddleware(), idOfMiddleware(CharacterModel, "id"), charactersController.copyCharacter);
router.post('/:id/skills/common/:skillId', authMiddleware(), idOfMiddleware(CharacterModel, "id"), idOfMiddleware(CommonSkillModel, "skillId"), contentMiddleware({value: 42}), charactersController.setCommonSkill);
router.post('/:id/skills/custom/:skillId', authMiddleware(), idOfMiddleware(CharacterModel, "id"), idOfMiddleware(CustomSkillModel, "skillId"), contentMiddleware({value: 42}), charactersController.setCustomSkill);
router.post('/:id/bases/:baseId', authMiddleware(), idOfMiddleware(CharacterModel, "id"), idOfMiddleware(BaseModel, "baseId"), contentMiddleware({value: 42}), charactersController.setBase);
router.post('/:id/nindo', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({text: "string"}), charactersController.setNindo);
router.post('/:id/nindoPoints', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({points: 42}), charactersController.setNindoPoints);
router.post('/:id/spes/:speIndex', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({id: "string"}), charactersController.setSpe);
router.post('/:id/notes', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({text: "string"}), charactersController.setNotes);
router.post('/:id/xp', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({xp: 42}), charactersController.setXp);
router.post('/:id/rank', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({id: 'string'}), idOfMiddleware(RankModel, "id", true), charactersController.setRank);
router.post('/:id/village', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({id: 'string'}), idOfMiddleware(VillageModel, "id", true), charactersController.setVillage);
router.post('/:id/name', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({text: 'string'}), charactersController.setName);
router.post('/:id/clan', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({id: 'string'}), idOfMiddleware(ClanModel, "id", true), charactersController.setClan);
router.post('/:id/road', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({id: 'string'}), charactersController.setRoad);
router.post('/:id/shareStatus', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({status: 'string'}), charactersController.setShareStatus);
router.delete('/:id', authMiddleware(), idOfMiddleware(CharacterModel, "id"), charactersController.deleteCharacter);

export default router;