import User from "../interfaces/user.interface.js";

declare module 'express' {

    export interface Request {
        user?: User;
    }
}