import axios from "axios";
export const autoComplete = async (req, res) => {
    const prefix = req.body.prefix;

    console.log(prefix)

    try {
        const response = await axios.get(
            `https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${prefix}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '0c8b8a1248msh05791a5363eb7a7p12b41ajsne1bcf2853fb7',
                    'x-rapidapi-host': 'tasty.p.rapidapi.com'
                }
            })

        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ message: `error fetching data, error: ${error.message}` })
    }
}