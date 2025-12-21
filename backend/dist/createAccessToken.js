import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export default function createAccessToken(payload) {
    return Jwt.sign(payload, JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '15m',
        issuer: 'The-app',
        audience: 'My-audience'
    });
}
