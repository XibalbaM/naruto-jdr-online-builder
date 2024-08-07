import {Middleware} from "./middleware.type.js";

export function checkTypeFields(model: any, obj: any): boolean {
    if (model === undefined || model === null) {
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

            if (modelKeys.length !== objKeys.length) {
                return false;
            }

            for (const key of modelKeys) {
                if (!obj.hasOwnProperty(key)) {
                    return false;
                }
                if (model[key] !== undefined && !checkTypeFields(model[key], obj[key])) {
                    return false;
                }
            }
        }
    }

    return true;
}

export default function (...types: any): Middleware {
    return async (req, res, next) => {
        const body = req.body;
        let success = false;
        for (let type of types) {
            if (checkTypeFields(type, body)) {
                success = true;
                break;
            }
        }
        if (!success) {
            res.status(400).json({error: "Invalid body"});
            return;
        }
        next();
    };
}