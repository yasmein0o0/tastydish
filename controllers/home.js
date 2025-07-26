export const home = async (req, res) => {
    try {
        const response = await axios.get('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes',
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '0c8b8a1248msh05791a5363eb7a7p12b41ajsne1bcf2853fb7',
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
