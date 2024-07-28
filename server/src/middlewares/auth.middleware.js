import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

dotenv.config();

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header('Authorization')?.replace("Bearer ", "");

        // console.log("token", token)
        if (!token) {
            res.status(401).json({
                message: "Unauthorized request"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded", decoded)

        const user = await User.findById(decoded?.id).select('-password')
        console.log("user", user);

        if (!user) { 
            res.status(404).json({
                message: "User not found"
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Not authorized"
        })
    }
}
