import axios from "axios";
import "dotenv/config"

export const home = async (req, res) => {
    try {
        const response = await axios.get('https://tasty.p.rapidapi.com/recipes/list?from=40&size=60&tags=under_30_minutes&q=chicken',
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': process.env.TASTY_API_KEY,
                    'x-rapidapi-host': 'tasty.p.rapidapi.com'
                }
            }
        )
        console.log(response.data);

        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: `Erorr fetching data: error: ${err.message}` })
    }
}
