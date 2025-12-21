import express from "express";
import cors from 'cors'
import authRouter from './routes/authRouter'
import protectedRouter from './routes/protectedRouter'

const app = express()
const PORT = 3041

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use('/auth', authRouter)
app.use('/protected', protectedRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);

})