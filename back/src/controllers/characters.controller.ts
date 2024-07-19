import {Request, Response} from "express";
import CharactersService from "../services/characters.service.js";
import ChakraSpeModel from "../models/chakraSpe.model.js";
import mongoose from "mongoose";

export async function create(req: Request, res: Response) {
    try {
        res.status(201).json({character: await CharactersService.createCharacter(req["user"]._id, req.body)})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function getCharacters(req: Request, res: Response) {
    try {
        res.status(200).json({characters: await CharactersService.listCharacters(req["user"])})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function getCharacter(req: Request, res: Response) {
    try {
        res.status(200).json({character: await CharactersService.getCharacter(req["user"], req.params.id)})
    } catch (error) {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function copyCharacter(req: Request, res: Response) {
    try {
        res.status(200).json({character: await CharactersService.copyCharacter(req["user"], req.params.id)})
    } catch (error) {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setCommonSkill(req: Request, res: Response) {
    try {
        await CharactersService.setCommonSkill(req["user"], req.params.id, req.params.skillId, req.body.value);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Invalid value") {
            return res.status(400).json({error: "Invalid value"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setCustomSkill(req: Request, res: Response) {
    try {
        await CharactersService.setCustomSkill(req["user"], req.params.id, req.params.skillId, req.body.value);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Invalid value") {
            return res.status(400).json({error: "Invalid value"});
        } else if (error.message === "Not allowed skill") {
            return res.status(400).json({error: "Not allowed skill"});
        } else if (error.message === "Cannot remove clan skill") {
            return res.status(400).json({error: "Cannot remove clan skill"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setBase(req: Request, res: Response) {
    try {
        await CharactersService.setBase(req["user"], req.params.id, req.params.baseId, req.body.value)
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Invalid value") {
            return res.status(400).json({error: "Invalid value"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setNindo(req: Request, res: Response) {
    try {
        await CharactersService.setNindo(req["user"], req.params.id, req.body.text)
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setNindoPoints(req: Request, res: Response) {
    try {
        await CharactersService.setNindoPoints(req["user"], req.params.id, req.body.points)
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setSpe(req: Request, res: Response) {
    try {
        if (!(mongoose.Types.ObjectId.isValid(req.body["id"]) && await ChakraSpeModel.exists({_id: req.body["id"]}))) {
            await CharactersService.removeSpe(req["user"], req.params.id, Number(req.params["speIndex"]));
        } else {
            await CharactersService.addSpe(req["user"], req.params.id, Number(req.params["speIndex"]), req.body["id"]);
        }
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else if (error.message === "Spe already maxed") {
            res.status(400).json({error: "Spe already maxed"});
        } else if (error.message === "Spe not yet unlocked") {
            res.status(400).json({error: "Spe not yet unlocked"});
        } else if (error.message === "Spe not set") {
            res.status(400).json({error: "Spe not set"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setNotes(req: Request, res: Response) {
    try {
        await CharactersService.setNotes(req["user"], req.params.id, req.body.text);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setXp(req: Request, res: Response) {
    try {
        await CharactersService.setXp(req["user"], req.params.id, req.body.xp);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setRank(req: Request, res: Response) {
    try {
        await CharactersService.setRank(req["user"], req.params.id, req.body.id);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setVillage(req: Request, res: Response) {
    try {
        await CharactersService.setVillage(req["user"], req.params.id, req.body.id);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setName(req: Request, res: Response) {
    try {
        await CharactersService.setName(req["user"], req.params.id, req.body.text);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setClan(req: Request, res: Response) {
    try {
        await CharactersService.setClan(req["user"], req.params.id, req.body.id);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setRoad(req: Request, res: Response) {
    try {
        await CharactersService.setRoad(req["user"], req.params.id, req.body.id);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else if (error.message === "Road not found") {
            res.status(404).json({error: "Road not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function setShareStatus(req: Request, res: Response) {
    try {
        if (req.body.status !in ["private", "not-referenced", "public"]) {
            return res.status(400).json({error: "Invalid state"});
        }
        await CharactersService.setShareStatus(req["user"], req.params.id, req.body.status);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}

export async function deleteCharacter(req: Request, res: Response) {
    try {
        await CharactersService.deleteCharacter(req["user"], req.params.id);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}