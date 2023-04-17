import {Middleware} from "../middleware.type.js";
import * as authService from "../../services/auth.service.js";

export default function (): Middleware {
    return function (req, res, next) {
        const tokenHeader = req.headers.authorization;
        if (tokenHeader && tokenHeader.split(' ')[0] === 'Bearer') {
            authService.getUserFromToken(tokenHeader.split(' ')[1]).then(user => {
                req['user'] = user;
                next();
            }).catch(err => {
                res.status(401).send({error: 'Cannot authenticate user.'});
            });
        } else {
            res.status(401).send({error: 'No token provided for accessing a protected resource.'});
        }
    }
}