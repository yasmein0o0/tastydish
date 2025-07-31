import { pool } from "../database/pg.js";

export const logOut = async (req, res) => {
    const id = req.user.id;
    console.log('senttt')

    try {
        const result = await pool.query(
            'UPDATE users SET refresh_token = NULL WHERE id=$1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.clearCookie("accessToken", {
            httpOnly: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Logged out" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
