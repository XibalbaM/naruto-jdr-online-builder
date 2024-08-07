import {Middleware} from "../middleware.type.js";
import * as authService from "../../services/auth.service.js";

/**
 * A function that returns a {@link Middleware} that checks if the user is authenticated, and if yes, adds the user to the request's user property.
 * @returns {Middleware} The middleware
 */
export default function (): Middleware {
    return async function (req, res, next) {
        const tokenHeader = req.headers.authorization;
        if (tokenHeader && tokenHeader.split(' ')[0] === 'Bearer') {
            authService.getUserFromDiscordToken(tokenHeader.split(' ')[1]).then(user => {
                req.user = user;
                next();
            }).catch(() => {
                res.status(401).send({error: 'Cannot authenticate user.'});
            });
        } else {
            res.status(401).send({error: 'No discord token provided for accessing a protected discord endpoint.'});
        }
    }
}