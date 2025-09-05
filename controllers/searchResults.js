import axios from "axios";
import "dotenv/config"

export const searchResults = async (req, res) => {
    const dish = req.query.dish;
    const encodedDish = encodeURIComponent(dish);
    try {
        const response = await axios.get(
            `https://tasty.p.rapidapi.com/recipes/list?from=0&size=40&q=${encodedDish}`,
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
        res.status(500).json({ message: `error fetching data, error: ${error.message}` })
    }
}