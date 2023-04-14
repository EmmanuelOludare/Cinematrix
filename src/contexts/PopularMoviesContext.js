import { useState, useEffect, createContext, useContext } from 'react';

const PopularMoviesContext = createContext();
export function usePopularMovies() {
    return useContext(PopularMoviesContext);
}

export function PopularMoviesProvider({ children }) {
    const [popularMovies, setPopularMovies] = useState([]);
    useEffect(() => {
        try {
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=48510b80e031b1cc54f349f5f5adb8bd&language=en-US&page=1')
                .then(res => res.json())
                .then(data => setPopularMovies(data.results));
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <PopularMoviesContext.Provider value={popularMovies}>
            {children}
        </PopularMoviesContext.Provider >
    )
}