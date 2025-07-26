import express from 'express'
import { home } from '../controllers/home.js';
import { receips } from '../controllers/receipDetails.js';
import { autoComplete } from '../controllers/autoComplete.js';
const router = express.Router();

router.get('/', home)
router.get('/home', home)
router.get('/:id', receips)
router.post('/autocomplete', autoComplete)

export default router