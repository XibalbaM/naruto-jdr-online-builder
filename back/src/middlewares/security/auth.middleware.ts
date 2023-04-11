import {Middleware} from "../middleware.type";
import * as authService from "../../services/auth.service";

export default function (): Middleware {
    return function (req, res, next) {
        const tokenHeader = req.headers.authorization;
        if (tokenHeader && tokenHeader.split(' ')[0] === 'Bearer') {
            authService.getUserFromToken(tokenHeader.split(' ')[1]).then(user => {
                req['user'] = user;
                next();
            }).catch(err => {
                res.status(400).send({error: 'Cannot authenticate user.'});
            });
        } else {
            res.status(400).send({error: 'No token provided for accessing a protected resource.'});
        }
    }
}