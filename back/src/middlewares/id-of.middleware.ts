import {Middleware} from "./middleware.type";
import {Model, Types} from "mongoose";

/**
 * Return a middleware that check if an url parameter is a valid id for the given model
 * @param model The model of the database.
 * @param parameterName The name of the url parameter.
 */
export default function (model: Model<any>, parameterName: string): Middleware {
	return (req, res, next) => {
		if (!req.params[parameterName] || !Types.ObjectId.isValid(req.params[parameterName]) || !model.exists({_id: req.params[parameterName]})) {
			res.status(404).json({error: `${model.modelName} not found`});
			return;
		}
		next();
	}
}