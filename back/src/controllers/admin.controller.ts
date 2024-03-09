import AdminService from "../services/admin.service";

export default class AdminController {

    static async getUsers(req, res) {
        res.status(200).send({users: await AdminService.getUsers()});
    }

    static async disconnectDiscord(req, res) {
        await AdminService.disconnectDiscord(req.params.id);
        res.status(200).send({message: 'Discord account disconnected.'});
    }

    static async deleteUser(req, res) {
        await AdminService.deleteUser(req.params.id);
        res.status(200).send({message: 'User deleted.'});
    }
}