import {Middleware} from "./middleware.type.js";
import {Model, Types} from "mongoose";

/**
 * Return a middleware that checks if an url parameter is a valid id for the given model
 * @param model The model of the database.
 * @param parameterName The name of the url parameter.
 * @param inBody If the id is in the body of the request. If false, the id is in the url parameters.
 */
export default function (model: Model<any>, parameterName: string, inBody: boolean = false): Middleware {
    return async (req, res, next) => {
        let data = deepValue(inBody ? req.body : req.params, parameterName);
        if (data === undefined || !(Types.ObjectId.isValid(data) || data.match(/^\d+$/))) {
            res.status(404).json({error: `${model.modelName} not found`});
            return;
        }
        if (await model.exists({_id: data})) next();
        else res.status(404).json({error: `${model.modelName} not found`});
    }
}

function deepValue(obj: any, path: string){
    let paths = path.split('.');
    for (let i=0; i < paths.length; i++){
        obj = obj[paths[i]];
    }
    return obj;
}