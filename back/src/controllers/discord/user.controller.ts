import {Request, Response} from "express";

import * as accountService from "../../services/account.service.js";

export function discordIdLinked(req: Request, res: Response) {
    res.status(200).send();
}

export async function onlineAccountExists(req: Request, res: Response) {
    res.status(await accountService.getUserNameFromEmail(req.params.email) === "No user" ? 404 : 200).send();
}