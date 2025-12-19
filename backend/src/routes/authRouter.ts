import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { db } from '../db.ts'
import { eq } from "drizzle-orm";
import { users } from "../schemas/userTable.ts";
import bcrypt from 'bcrypt'
import createAccessToken from "../createAccessToken.ts";
import Jwt from "jsonwebtoken";

const router = Router()

// Info Validation middleware
const validateInfo = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.pass || req.body.pass.length > 8) {
        return res.status(400).json({ messeage: 'Email and password are required' })
    } else {
        next()
    }
}

// Token Varification middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // Check if the authorization header exists
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer')) return res.status(400).json({ message: 'Unauthorized!' })

    const token = auth?.split(' ')[1]

    // Verify the token 
    try {
        if (!process.env.JWT_SECRET_KEY) return res.status(401)
        let payload = Jwt.verify(token, process.env.JWT_SECRET_KEY) as Jwt.JwtPayload
        // req.user = {
        //     id: payload.sub,
        //     email: payload.email
        // }
        next()
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Invalid token" });
    }
}

// Signup endpoint
router.post('/register', validateInfo, async (req: Request, res: Response) => {
    const email = req.body.email
    const pass = req.body.pass
    const username = req.body.username

    // Check if user already exists
    const check = await db.select()
        .from(users)
        .where(eq(users.email, email))
    if (check.length > 0) {
        return res.status(400).json({ message: 'User already exists' })
    }

    // hash the password
    const password_hash = await bcrypt.hash(pass, 12)

    // insert the password into database
    await db.insert(users).values({
        email: email,
        password_hash: password_hash,
        username: username
    })

    res.json({ message: 'User registered successfully' })
})

// Login endpoint
router.post('/login', requireAuth, async (req: Request, res: Response) => {
    const email = req.body.email
    const pass = req.body.pass

    // find the user in database
    const find = await db.select()
        .from(users)
        .where(eq(users.email, email))
    if (find.length === 0) {
        return res.status(400).json({ message: 'User not found' })
    }

    // compare the password
    let matched = await bcrypt.compare(pass, find[0].password_hash)
    if (!matched) return res.status(400).json({ message: 'Password is not correct' })

    // if password correct create jwt
    const token = createAccessToken({ sub: find[0].id, email: find[0].email, role: 'user' })

    res.json({ message: 'User Found', token: token })
})

export default router


const find = await db.select()
    .from(users)
    .where(eq(users.email, 'rafeyabdul425@gmail.com'))

const userId = find[0].id

console.log(typeof userId as string);

