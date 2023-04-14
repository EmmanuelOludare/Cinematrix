import { useState, useEffect, createContext, useContext } from 'react';

const TrendingContext = createContext();
export function useTrending() {
    return useContext(TrendingContext);
}

export function TrendingProvider({ children }) {
    const [trending, setTrending] = useState([]);
    useEffect(() => {
        try {
            fetch('https://api.themoviedb.org/3/trending/all/day?api_key=48510b80e031b1cc54f349f5f5adb8bd')
                .then(res => res.json())
                .then(data => setTrending(data.results.splice(0, 10)));
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <TrendingContext.Provider value={trending}>
            {children}
        </TrendingContext.Provider >
    )
}