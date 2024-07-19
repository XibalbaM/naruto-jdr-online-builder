import {Request, Response} from "express";

import * as groupsService from "../services/groups.service.js";

export function select(req: Request, res: Response) {
    const user = req.user!;
    const group = user["groups"][req.body["commandId"] - 1];
    if (!group) {
        res.sendStatus(404);
        return;
    }
    groupsService.discordSelect(user, group).then(() => {
        res.status(200).json({group: group});
    }).catch((error) => {
        if (error.message === "Group not found")
            res.sendStatus(404);
        else {
            console.error(error);
            res.sendStatus(500);
        }
    });
}

export function getSelected(req: Request, res: Response) {
    /*if (!req.user["discordSelectedGroup"])
        res.sendStatus(404);
    else
        res.status(200).json(req.user!["groups"].filter(group => group._id.toString() === req.user!["discordSelectedGroup"].toString())[0]);*/
}

export function create(req: Request, res: Response) {

    groupsService.create(req.body, req.user!._id.toString()).then((group) => {
        res.status(201).json({group: group});
    }).catch((error) => {
        if (error.message === "Group already exists")
            res.status(409).json({error: error.message});
        else {
            console.error(error);
            res.status(500).json("Internal server error");
        }
    });
}

export function list(req: Request, res: Response) {

    groupsService.getAll(req.user!).then((groups) => {
        res.status(200).json({groups: groups});
    }).catch((error) => {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    });
}

export function get(req: Request, res: Response) {

    groupsService.getOne(req.params["id"]).then((group) => {
        res.status(200).json({group: group});
    }).catch((error) => {
        if (error.message === "Group not found")
            res.status(404).json({error: "Group not found"});
        else if (error.message === "Invalid group id")
            res.status(400).json({error: "Invalid group id"});
        else {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    });
}