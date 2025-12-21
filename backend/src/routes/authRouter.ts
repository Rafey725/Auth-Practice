import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../schemas/userTable";
import bcrypt from 'bcrypt'
import createAccessToken from "../createAccessToken";
import { requireAuth, validateInfo } from "../utilityMiddlewares";

const router = Router()

interface AuthRequest extends Request {
    user?: {
        id: string | undefined;
        email: string;
    };
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
        username: username,
        email: email,
        password_hash: password_hash
    })

    res.json({ message: 'User registered successfully' })
})

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
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

// Get user info
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
    const find = await db.select()
        .from(users)
        .where(eq(users.id, Number(req.user?.id)))

    res.json({
        message: 'Your user info is returned',
        userInfo: {
            name: find[0].username,
            email: find[0].email,
            created_at: find[0].created_at
        }
    })
})

export default router

