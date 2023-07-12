import {Router} from "express";
import authMiddleware from "../middlewares/security/auth.middleware.js";
import * as charactersController from "../controllers/characters.controller.js";
import contentMiddleware from "../middlewares/content.middleware.js";
import idOfMiddleware from "../middlewares/id-of.middleware.js";
import CharacterModel from "../models/character.model.js";
import ChakraSpeModel from "../models/chakraSpe.model.js";
import SkillModel from "../models/skill.model.js";
import BaseModel from "../models/base.model.js";

/**
 * The router for the /character path.
 * @type {Router}
 */
const router = Router();

router.post('/', authMiddleware(), contentMiddleware({
	character: {
		notes: "string",
		firstName: "string",
		clan: "string",
		village: "string",
		xp: 42,
		nindo: "string"
	}
}), charactersController.create);
router.get('/', authMiddleware(), charactersController.getCharacters);
router.get('/:id', authMiddleware(), idOfMiddleware(CharacterModel, "id"), charactersController.getCharacter);
router.post('/:id/skills/:skillId', authMiddleware(), idOfMiddleware(CharacterModel, "id"), idOfMiddleware(SkillModel, "skillId"), contentMiddleware({value: 42}), charactersController.setSkill);
router.post('/:id/bases/:baseId', authMiddleware(), idOfMiddleware(CharacterModel, "id"), idOfMiddleware(BaseModel, "baseId"), contentMiddleware({value: 42}), charactersController.setBase);
router.post('/:id/nindo', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({text: "string"}), charactersController.setNindo);
router.post('/:id/nindoPoints', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({points: 42}), charactersController.setNindoPoints);
router.put('/:id/spes/:speId', authMiddleware(), idOfMiddleware(CharacterModel, "id"), idOfMiddleware(ChakraSpeModel, "speId"), charactersController.addSpe);
router.delete('/:id/spes/:speId', authMiddleware(), idOfMiddleware(CharacterModel, "id"), idOfMiddleware(ChakraSpeModel, "speId"), charactersController.removeSpe);
router.post('/:id/notes', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({text: "string"}), charactersController.setNotes);
router.post('/:id/xp', authMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({xp: 42}), charactersController.setXp);
router.delete('/:id', authMiddleware(), idOfMiddleware(CharacterModel, "id"), charactersController.deleteCharacter);

export default router;