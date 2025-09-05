import axios from "axios";
import "dotenv/config"
export const autoComplete = async (req, res) => {
    const prefix = req.body.prefix;

    console.log(prefix)
    console.log(`https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${prefix}`)

    try {
        const response = await axios.get(
            `https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${prefix}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': process.env.TASTY_API_KEY,
                    'x-rapidapi-host': 'tasty.p.rapidapi.com'
                }
            })

        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ message: `error fetching data, error: ${error.message}` })
    }
}