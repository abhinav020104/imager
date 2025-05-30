import { NextFunction , Request , Response} from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export async function authMiddleWare(req:Request , res:Response , next:NextFunction){
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try{
        const decoded = jwt.verify(token, process.env.AUTH_JWT_KEY as string , {
            algorithms: ["RS256"]
        })
        console.log(decoded);
        if(decoded?.sub){
            //@ts-ignore
            req.body.userId = decoded.sub as string;
            next();
        }
    }catch(error){
        return res.status(401).json({ message: "Invalid token" });
    }

}