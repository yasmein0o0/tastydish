import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '30m' }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 1000 * 60 * 30
        });

        res.status(200).json({ message: "Access token refreshed" });
    });
};
