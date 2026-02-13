import { NextFunction, Request, Response } from "express"; // Tambahkan Response
import jwt from "jsonwebtoken"; // Tambahkan import jwt

const JWT_SECRET = process.env.JWT_SECRET || "mirza1905";

export interface AuthRequest extends Request {
    user?: any;
}

export const authentication = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Ganti koma dengan titik koma

    if (!token) {
        res.status(401).json({ message: "Authentication Required!" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Perbaiki typo descoded → decoded
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid Token" });
    }
}
