import type { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        id: string | undefined;
        email: string;
    };
}


// Info Validation middleware
export const validateInfo = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.pass || req.body.pass.length < 8) {
        return res.status(400).json({ message: 'Email and password are invalid' })
    } else {
        next()
    }
}


// Token Varification middleware -- remember it is authentication not authorization
export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Check if the authorization header exists
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer')) return res.status(401).json({ message: 'Unauthorized!' })

    const token = auth?.split(' ')[1]

    // Verify the token 
    try {
        if (!process.env.JWT_SECRET_KEY) return res.status(401).json({ message: 'Something is missing' })
        let payload = Jwt.verify(token, process.env.JWT_SECRET_KEY) as Jwt.JwtPayload

        req.user = {
            id: payload.sub,
            email: payload.email
        }
        next()
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
}