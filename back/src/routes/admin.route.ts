import {Router} from "express";
import AdminController from "../controllers/admin.controller";

const router = Router();

router.get('/users', AdminController.getUsers);
router.delete('/users/:id/discord', AdminController.disconnectDiscord);
router.delete('/users/:id', AdminController.deleteUser);

export default router;