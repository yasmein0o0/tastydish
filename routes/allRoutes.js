import express from 'express'
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
import { verifyToken } from '../middlewares/verifyToken.js';
import { logOut } from '../controllers/logout.js';
import { loginValidation } from '../middlewares/loginValidation.js';
import { login } from '../controllers/login.js';
import { refreshToken } from '../controllers/refresh.js';
import { deleteAccount } from "../controllers/deleteAccount.js";
import { logInRateLimit, refreshLimiter } from '../middlewares/rateLimit.js';
import { addToFavourites, removeFromFavourites, getFavourites } from '../controllers/favourites.js';
const router = express.Router();

router.get('/', home)
router.get('/home', home)
router.get('/:id', receips)
router.post('/autocomplete', autoComplete)
router.post('/search', searchResults)

router.post('/contact', logInRateLimit, contactValidation, resultOfValidation, contactUs);


//auth
router.post('/signup', logInRateLimit, blockIfLogin, signupValidation, resultOfValidation, signup);
router.post('/log-out', verifyToken, logOut)
router.post('/log-in', logInRateLimit, blockIfLogin, loginValidation, resultOfValidation, login)
router.post('/refresh', refreshLimiter, refreshToken)
router.delete("/delete-account", verifyToken, deleteAccount);

// Add to Favourites 
router.post("/add-to-favourites", verifyToken, addToFavourites);
router.post("/delete-from-favourites", verifyToken, removeFromFavourites);
router.post("/get-favourites", verifyToken, getFavourites);



export default router