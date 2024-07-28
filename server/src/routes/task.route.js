import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route('/')
    .get(verifyJWT, getTasks)
    .post(verifyJWT, createTask)

router
    .route('/:taskId')
    .get(verifyJWT, getTaskById)
    .post(verifyJWT, updateTask)
    .delete(verifyJWT, deleteTask)



export default router;