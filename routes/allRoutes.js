import express from 'express'
import { home } from '../controllers/home.js';
const router = express.Router();

router.get('/', home)
router.get('/home', home)

export default router