import dotenv from 'dotenv';
import connectDB from './db/index.js';
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/user.route.js'
import taskRoutes from './routes/task.route.js'

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: '*', 
    credentials: true, 
}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use(cookieParser())

app.use('/api/v1/users', authRoutes)
app.use('/api/v1/tasks', taskRoutes)

app.get('/', (req, res) => { 
    res.send('API is running');
})

export default app;