import {Middleware} from "../middleware.type.js";

/**
 * A function that returns a {@link Middleware} that checks if the user is an admin, and if not, returns a 401 error.
 *
 * Must be used after the authMiddleware.
 * @returns {Middleware} The middleware
 */
export default function (): Middleware {
    return async function (req, res, next) {
        if (req.user && req.user.isAdmin) {
            next();
            return;
        } else if (!req.user) {
            throw new Error("No user found in request. Did you forget to use the authMiddleware?");
        } else {
            res.status(401).json({message: "You must be an admin to do this."});
        }
    }
}