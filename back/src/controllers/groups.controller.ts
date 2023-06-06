import {Request, Response} from "express";

import * as groupsService from "../services/groups.service.js";
import Group from "../classes/group.class";

export function select(req: Request, res: Response) {
    const user = req["user"];
    const group = user["groups"][req.body["commandId"] - 1];
    if (!group)
        return res.sendStatus(404);
    groupsService.discordSelect(user._id, group._id).then(() => {
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
    if (!req["user"]["discordSelectedGroup"])
        return res.sendStatus(404);
    res.status(200).json(req["user"]["groups"].filter(group => group._id.toString() === req["user"]["discordSelectedGroup"].toString())[0]);
}

export function create(req: Request, res: Response) {

    groupsService.create(req.body, req["user"]._id).then((group) => {
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

    res.status(200).json({groups: req["user"]["groups"]});
}

export function get(req: Request, res: Response) {

    const userGroups: Group[] = req["user"]["groups"];
    const group = userGroups.find((group) => group._id.toString() === req.params.id);
    if (group)
        res.status(200).json({group: group});
    else
        res.status(404).json({error: "Group not found"});
}