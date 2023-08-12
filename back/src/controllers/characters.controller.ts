import {Request, Response} from "express";
import CharactersService from "../services/characters.service.js";

export function create(req: Request, res: Response) {
    CharactersService.createCharacter(req["user"]._id, req.body).then(character => res.status(201).json({character})).catch((error) => {
        res.status(500).json({error: "Internal server error"});
        console.error(error);
    });
}

export function getCharacters(req: Request, res: Response) {

    CharactersService.listCharacters(req["user"]).then((characters) => res.status(200).json({characters})).catch((error) => {
        res.status(500).json({error: "Internal server error"});
        console.error(error);
    });
}

export function getCharacter(req: Request, res: Response) {
    CharactersService.getCharacter(req["user"]["_id"], req.params.id).then((character) => res.status(200).json({character})).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setSkill(req: Request, res: Response) {
    console.log(req.body);
    CharactersService.setSkill(req["user"]["_id"], req.params.id, req.params.skillId, req.body.value).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Invalid value") {
            console.log("Invalid value" + req.body.value)
            return res.status(400).json({error: "Invalid value"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setBase(req: Request, res: Response) {
    CharactersService.setBase(req["user"]["_id"], req.params.id, req.params.baseId, req.body.value).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Invalid value") {
            return res.status(400).json({error: "Invalid value"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setNindo(req: Request, res: Response) {
    CharactersService.setNindo(req["user"]["_id"], req.params.id, req.body.text).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setNindoPoints(req: Request, res: Response) {
    CharactersService.setNindoPoints(req["user"]["_id"], req.params.id, req.body.points).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function addSpe(req: Request, res: Response) {
    CharactersService.changeSpe(req["user"]["_id"], req.params.id, req.params.speId, "add").then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Spe already maxed") {
            return res.status(400).json({error: "Spe already maxed"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function removeSpe(req: Request, res: Response) {
    CharactersService.changeSpe(req["user"]["_id"], req.params.id, req.params.speId, "remove").then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Spe already at 0") {
            return res.status(400).json({error: "Spe already at 0"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setNotes(req: Request, res: Response) {
    CharactersService.setNotes(req["user"]["_id"], req.params.id, req.body.text).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setXp(req: Request, res: Response) {
    CharactersService.setXp(req["user"]["_id"], req.params.id, req.body.xp).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setVillage(req: Request, res: Response) {
    CharactersService.setVillage(req["user"]["_id"], req.params.id, req.body.id).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Village not found") {
            return res.status(404).json({error: "Village not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setName(req: Request, res: Response) {
    CharactersService.setName(req["user"]["_id"], req.params.id, req.body.text).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setClan(req: Request, res: Response) {
    CharactersService.setClan(req["user"]["_id"], req.params.id, req.body.id).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Clan not found") {
            return res.status(404).json({error: "Clan not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function setRoad(req: Request, res: Response) {
    CharactersService.setRoad(req["user"]["_id"], req.params.id, req.body.id).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else if (error.message === "Road not found") {
            return res.status(404).json({error: "Road not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}

export function deleteCharacter(req: Request, res: Response) {
    CharactersService.deleteCharacter(req["user"]["_id"], req.params.id).then(() => res.sendStatus(200)).catch((error) => {
        if (error.message === "Character not found") {
            return res.status(404).json({error: "Character not found"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(error);
        }
    });
}