import {Router} from "express";

/**
 * The router for the /groups path.
 * @type {Router}
 */
const router = Router();

/*router.post('/', captchaMiddleware(), contentMiddleware({name: "name", village: undefined}), authMiddleware(), groupsController.create);
router.get('/', authMiddleware(), groupsController.list);
router.get('/:id', authMiddleware(), idOfMiddleware(GroupModel, "id"), groupsController.get);*/

export default router;