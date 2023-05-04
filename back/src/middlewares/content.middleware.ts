import {Middleware} from "./middleware.type.js";

type TypeDescription<T> = Record<keyof T, any>;

export function checkTypeFields<T>(type: TypeDescription<T>, value: any): boolean {
    const typeFields = Object.keys(type);

    if (!value) {
        return false;
    }

    for (const field of typeFields) {
        if (!value[field]) {
            return false;
        }
        if (typeof type[field] === "object" && type[field] !== null) {
            if (!checkTypeFields(type[field], value[field])) {
                return false;
            }
            continue;
        }
        if (!value.hasOwnProperty(field) || typeof value[field] !== typeof type[field]) {
            return false;
        }
    }

    return true;
}

export default function <T>(type: TypeDescription<T>): Middleware {

    return (req, res, next) => {
        const body = req.body;

        if (!checkTypeFields(type, body)) {
            return res.status(400).json({error: "Invalid body"});
        }

        next();
    };
}