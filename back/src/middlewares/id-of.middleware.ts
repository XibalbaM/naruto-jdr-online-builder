import {Middleware} from "./middleware.type";
import {Model, Types} from "mongoose";

/**
 * Return a middleware that checks if an url parameter is a valid id for the given model
 * @param model The model of the database.
 * @param parameterName The name of the url parameter.
 * @param inBody If the id is in the body of the request. If false, the id is in the url parameters.
 */
export default function (model: Model<any>, parameterName: string, inBody: boolean = false): Middleware {
    if (inBody) {
        return async (req, res, next) => {
            if (req.body[parameterName] === undefined || !(Types.ObjectId.isValid(req.body[parameterName]) || req.body[parameterName].match(/^\d+$/))) {
                res.status(404).json({error: `${model.modelName} not found`});
                return;
            }
            if (!model.exists({_id: req.body[parameterName]})) res.status(404).json({error: `${model.modelName} not found`});
            else next();
        }
    } else {
        return async (req, res, next) => {
            if (req.params[parameterName] === undefined || !(Types.ObjectId.isValid(req.params[parameterName]) || req.params[parameterName].match(/^\d+$/))) {
                res.status(404).json({error: `${model.modelName} not found`});
                return;
            }
            if (!model.exists({_id: req.params[parameterName]})) res.status(404).json({error: `${model.modelName} not found`});
            else next();
        }
    }
}