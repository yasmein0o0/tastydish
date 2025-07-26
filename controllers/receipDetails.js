import axios from "axios";

export const receips = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(
            `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '0c8b8a1248msh05791a5363eb7a7p12b41ajsne1bcf2853fb7',
                    'x-rapidapi-host': 'tasty.p.rapidapi.com'
                }
            }
        )
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ message: `error fetching receips details, error: $${error.message}` })
    }
}