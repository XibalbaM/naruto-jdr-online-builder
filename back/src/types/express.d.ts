import { Request } from 'express';
import User from "../interfaces/user.interface";

declare module 'express' {

    export interface Request {
        user?: User;
    }
}