import xss from "xss";
import { pool } from "../database/pg.js";

export const contactUs = async (req, res) => {
    const { name, email, subject, enquery, message } = req.body

    //sanitize Html
    const cleanName = xss(name)
    const cleanEmail = xss(email)
    const cleanSubject = xss(subject)
    const cleanEnquery = xss(enquery)
    const cleanMessage = xss(message)

    try {
        await pool.query('INSERT INTO emails(user_name,email,subject,message) VALUES($1,$2,$3,$4)',
            [cleanName, cleanEmail, cleanSubject, cleanMessage]
        )
        res.status(200).json({ message: "Message received successfully" });
    } catch (error) {
        res.status(500).json({ message: `error getting your message` })
    }
}