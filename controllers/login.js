import { pool } from "../database/pg.js";
import jwt from 'jsonwebtoken';
import xss from "xss";

import bcrypt from "bcrypt";

export const login = async (req, res) => {
    const email = xss(req.body.email);
    const password = xss(req.body.password);

    try {
        // 1- check if email exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rowCount < 1) {
            return res.status(401).json({ message: 'Email not found' });
        }

        // 2- check password
        const checkPassword = await bcrypt.compare(password, result.rows[0].password);
        if (!checkPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // 3- sign tokens
        const user = result.rows[0]
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });

        // 4- update refresh token in DB
        await pool.query(
            'UPDATE users SET refresh_token = $1 WHERE id = $2',
            [refreshToken, user.id]
        );

        // 5- set refresh token cookie ONLY
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // 6- send access token in response body (for Redux)
        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: { id: result.rows[0].id, name: result.rows[0].name, email: result.rows[0].email }
        });

    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};
