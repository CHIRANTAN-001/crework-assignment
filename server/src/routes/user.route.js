import { Router } from "express";
import { getUserDetails, login, logout, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route('/register')
    .post(registerUser)

router
    .route('/login')
    .post(login)

router
    .route('/logout')
    .get(verifyJWT, logout)

router
    .route('/details')
    .get(verifyJWT, getUserDetails)


export default router;