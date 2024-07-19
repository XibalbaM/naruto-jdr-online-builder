import AdminService from "../services/admin.service.js";
import {Request, Response} from "express";

export default class AdminController {

    static async getUsers(req: Request, res: Response) {
        res.status(200).send({users: await AdminService.getUsers()});
    }

    static async disconnectDiscord(req: Request, res: Response) {
        await AdminService.disconnectDiscord(req.params["id"]);
        res.status(200).send({message: 'Discord account disconnected.'});
    }

    static async deleteUser(req: Request, res: Response) {
        await AdminService.deleteUser(req.params["id"]);
        res.status(200).send({message: 'User deleted.'});
    }
}