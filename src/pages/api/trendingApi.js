const axios = require('axios');

export default function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const genreType = req.query.type;

    if (!genreType) {
        res.status(400).json({ error: 'Invalid parameter' });
        return;
    }

    const getTrending = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/${genreType}/day?api_key=${apiKey}`,
    }

    axios.request(getTrending).then((response) => {
        res.status(200).json(response.data.results.splice(0, 10))
    }).catch((error) => {
        res.status(500).json({ error: 'Failed to fetch data' });
    })
}