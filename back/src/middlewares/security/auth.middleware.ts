import {Middleware} from "../middleware.type.js";
import * as authService from "../../services/auth.service.js";

/**
 * A function that returns a {@link Middleware} that checks if the user is authenticated, and if yes, adds the user to the request's user property.
 * @returns {Middleware} The middleware
 */
export default function (): Middleware {
    return async function (req, res, next) {
        const token: string | undefined = req.cookies.token;
        if (token && token !== 'none') {
            try {
                req['user'] = await authService.getUserFromToken(token);
                next();
            } catch (e) {
                res.status(401).send({error: 'Cannot authenticate user.'});
            }
        } else {
            res.status(401).send({error: 'No token provided for accessing a protected resource.'});
        }
    }
}