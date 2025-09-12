import { pool } from "../database/pg.js";
import xss from "xss";
import jwt from "jsonwebtoken"
import "dotenv/config"
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    console.log('sent')
    const username = xss(req.body.name);
    const email = xss(req.body.email);
    const password = xss(req.body.password);

    //check inputs
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        //check if email is already signed up
        const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (checkEmail.rows.length > 0) {
            return res.status(409).json({ message: `${email} is already used` });
        }

        //1- hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query('INSERT INTO users(name,email,password) values($1,$2,$3) RETURNING*',
            [username, email, hashedPassword]);

        //2- generate refresh token
        console.log(result)
        const userId = result.rows[0].id
        console.log(userId)
        const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })

        //3- generate access token
        const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" })

        //4- save refersh token in db
        await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [refreshToken, userId]);

        // 5- set refresh token cookie ONLY
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        const { id, name, email: savedEmail } = result.rows[0];

        // 6- send access token in response body (for Redux)
        return res.status(201).json({
            message: "Signup successful",
            accessToken,
            user: { id, name, email: savedEmail }
        });

    } catch (error) {
        return res.status(500).json({ message: `server error: ${error}` })
    }
}