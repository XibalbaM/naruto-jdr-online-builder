import {Router} from "express";
import AdminController from "../controllers/admin.controller.js";

const router = Router();

router.get('/users', AdminController.getUsers);
router.get('/users/:id', AdminController.getUser);
router.get('/users/:id/email', AdminController.sendEmail);
router.delete('/users/:id/discord', AdminController.disconnectDiscord);
router.delete('/users/:id', AdminController.deleteUser);

router.get('/characters', AdminController.getCharacters);

export default router;