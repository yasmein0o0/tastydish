import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './routes/allRoutes.js';
import helmet from 'helmet';
import hpp from 'hpp';
import { globalLimiter } from './middlewares/rateLimit.js';
import "dotenv/config"
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(globalLimiter)
app.use(helmet())
app.use(hpp())
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.listen(8080)
