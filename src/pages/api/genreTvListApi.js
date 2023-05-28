const axios = require('axios');

export default function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const getTvGenre = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
    }

    axios.request(getTvGenre).then((response) => {
        res.status(200).json(response.data.genres)
    }).catch((error) => {
        res.status(500).json({ error: 'Failed to fetch data' });
    })
}