import express from 'express'
import { validationResult } from 'express-validator';
import { home } from '../controllers/home.js';
import { receips } from '../controllers/receipDetails.js';
import { autoComplete } from '../controllers/autoComplete.js';
import { searchResults } from '../controllers/searchResults.js';
import contactValidation from '../middlewares/contactUsValidation.js';
import { contactUs } from '../controllers/contactUs.js';
import { signupValidation } from '../middlewares/signupValidation.js';
import { resultOfValidation } from '../middlewares/resultOfValidation.js';
import { signup } from '../controllers/signup.js';
import { blockIfLogin } from '../middlewares/blockIfLogged.js';
const router = express.Router();

router.get('/', home)
router.get('/home', home)
router.get('/:id', receips)
router.post('/autocomplete', autoComplete)
router.post('/search', searchResults)

router.post('/contact', contactValidation, resultOfValidation, contactUs);


//auth
router.post('/signup', signupValidation, resultOfValidation, blockIfLogin, signup)
export default router