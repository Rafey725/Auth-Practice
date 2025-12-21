import * as express from "express";
interface JwtPayload {
  id: string;
  email: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: any; // or replace `any` with your JWT payload type
    }
  }
}
