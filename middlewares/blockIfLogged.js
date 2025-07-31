import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const blockIfLogin = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log(token)
    if (!token) return next();
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err) => {
        if (err) return next();
        return res.status(400).json({ message: 'you are already logged in' });
    })
}