import {Response, NextFunction, Request} from "express";

/**
 * Define the middleware type
 */
export type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;