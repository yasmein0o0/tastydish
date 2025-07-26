import express from 'express'
import { home } from '../controllers/home.js';
import { receips } from '../controllers/receipDetails.js';
const router = express.Router();

router.get('/', home)
router.get('/home', home)
router.get('/:id', receips)

export default router