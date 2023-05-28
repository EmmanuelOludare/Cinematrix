const axios = require('axios');

export default function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const { genreType, genreBranch } = req.query;

    if (!genreType || !genreBranch) {
        res.status(400).json({ error: 'Invalid parameters' });
        return;
    }

    const getPopularGenre = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${genreType}/${genreBranch}?api_key=${apiKey}&language=en-US&page=1`
    }

    axios.request(getPopularGenre).then((response) => {
        res.status(200).json(response.data.results)
    }).catch((error) => {
        res.status(500).json({ error: 'Failed to fetch data' });
    })
}