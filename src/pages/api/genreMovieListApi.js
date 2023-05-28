const axios = require('axios');

export default function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const getMovieGenre = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    }

    axios.request(getMovieGenre).then((response) => {
        res.status(200).json(response.data.genres)
    }).catch((error) => {
        res.status(500).json({ error: 'Failed to fetch data' });
    })
}