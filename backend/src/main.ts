import express from "express";
import cors from 'cors'
import authRouter from './routes/authRouter.js'
import bcrypt from 'bcrypt'

const app = express()
const PORT = 3041

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // keep true if you use cookies/sessions
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);

})