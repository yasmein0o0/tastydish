import axios from "axios";
import "dotenv/config"

export const receips = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(
            `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': process.env.TASTY_API_KEY,
                    'x-rapidapi-host': 'tasty.p.rapidapi.com'
                }
            }
        )
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ message: `error fetching receips details, error: $${error.message}` })
    }
}