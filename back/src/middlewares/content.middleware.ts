import {Middleware} from "./middleware.type.js";

export function checkTypeFields(model: any, obj: any): boolean {
    if (model === undefined || model === null) {
        return false;
    }
    if (model === "optional" && (obj === undefined || obj === null)) {
        return true;
    }
    if (typeof model !== typeof obj || obj === undefined || obj === null) {
        return false;
    }

    if (typeof model === 'object') {
        if (Array.isArray(model)) {
            if (!Array.isArray(obj)) {
                return false;
            }

            if (model.length === 1 && Object.keys(model[0]).length === 0) {
                return Array.isArray(obj) && obj.every(item => typeof item === 'object');
            }
            const modelItem = model[0];
            for (const [_, item] of obj.entries()) {
                if (!checkTypeFields(modelItem, item)) {
                    return false;
                }
            }
        } else {
            if (Array.isArray(obj)) {
                return false;
            }

            const modelKeys = Object.keys(model);
            const objKeys = Object.keys(obj);
            if (!objKeys.every(key => modelKeys.includes(key))) {
                return false;
            }

            for (const key of modelKeys) {
                console.log(key, model[key], obj[key]);
                if (model[key] !== undefined && !checkTypeFields(model[key], obj[key])) {
                    return false;
                }
            }
        }
    }

    return true;
}

export default function (type: any): Middleware {
    return async (req, res, next) => {
        if (!checkTypeFields(type, req.body)) {
            res.status(400).json({error: "Invalid body"});
            return;
        }
        next();
    };
}