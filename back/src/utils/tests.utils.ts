import {vi} from "vitest";
import {Request, Response} from "express";
import authMiddleware from "../middlewares/security/auth.middleware.js";

export function createMockRequest(data?: any, token?: string) {
    return {
        cookies: {
            token: token,
            ...data?.cookies
        },
        ...data
    } as any as Request;
}

export function createMockResponse() {
    return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        send: vi.fn().mockReturnThis(),
        cookie: vi.fn().mockReturnThis(),
        clearCookie: vi.fn().mockReturnThis(),
        sendStatus: vi.fn().mockReturnThis(),
        set: vi.fn().mockReturnThis(),
    } as any as Response;
}

export function createMockNext() {
    return vi.fn();
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function authenticateRequest(req: Request, res: Response) {
    await (authMiddleware()(req, res, () => {}));
}