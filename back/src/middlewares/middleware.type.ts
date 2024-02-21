import {Request, Response, NextFunction} from "express";

/**
 * Define the middleware type
 */
export type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;