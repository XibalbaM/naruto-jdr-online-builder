import {Router} from "express";
import {Model} from "mongoose";

import DataController from "../controllers/data.controller.js";
import authMiddleware from "../middlewares/security/auth.middleware.js";
import adminMiddleware from "../middlewares/security/admin.middleware.js";
import contentMiddleware from "../middlewares/content.middleware.js";
import idOfMiddleware from "../middlewares/id-of.middleware.js";

/**
 * Returns a router with routes for the given model. It allows everyone to read the data, but only admins to create, update and delete it.
 * @param model The model to create the routes for.
 * @param modelToClass A function that returns the class of the model.
 * @returns A router with routes for the given model.
 */
export default async function (model: Model<any>, modelToClass: (model: any) => any) {
    const router = Router();
    const dataController = new DataController(model, modelToClass);
    const exempleData = modelToClass(await model.findOne());
    delete exempleData._id;

    router.get("/", dataController.getAll);
    router.get("/:id", idOfMiddleware(model, "id"), dataController.get);
    router.post("/", authMiddleware(), adminMiddleware(), contentMiddleware({data: exempleData}), dataController.create);
    router.put("/:id", authMiddleware(), adminMiddleware(), idOfMiddleware(model, "id"), contentMiddleware({data: exempleData}), dataController.update);
    router.delete("/:id", authMiddleware(), adminMiddleware(), idOfMiddleware(model, "id"), dataController.delete);

    return router;
}