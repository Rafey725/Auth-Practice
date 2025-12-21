import { Router } from "express";
import { db } from "../db";
import { users } from "../schemas/userTable";
import { requireAuth } from "../utilityMiddlewares";

const router = Router()

router.get('/seeUsers', requireAuth, async (req, res) => {
    let allUsers = await db.select({ username: users.username }).from(users)
    res.json({ message: 'Fetched all users', users: allUsers })
})

export default router

const seeUsers = (async () => {
    let allUsers = await db.select({ username: users.username }).from(users)
    // console.log(allUsers);
})()