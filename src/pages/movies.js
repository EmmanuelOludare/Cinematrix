import { useState, useEffect } from 'react';
import Trending from './components/Trending';
import UpcomingMovies from './components/UpcomingMovies';
import PopularMovies from './components/PopularMovies';
import TopRatedMovies from './components/TopRatedMovies';
import ViewInfo from './components/ViewInfo';
import Navbar from './components/Navbar';
import Head from 'next/head';

export default function Movies() {
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [genres, setGenres] = useState();
    const [information, setInformation] = useState();
    const [visible, setVisible] = useState(false);
    const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?api_key=48510b80e031b1cc54f349f5f5adb8bd';

    useEffect(() => {
        try {
            fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=48510b80e031b1cc54f349f5f5adb8bd&language=en-US')
                .then(res => res.json())
                .then(data => setMovieGenres(data.genres));
        } catch (error) {
            console.log(error);
        }

        try {
            fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=48510b80e031b1cc54f349f5f5adb8bd&language=en-US')
                .then(res => res.json())
                .then(data => setTvGenres(data.genres));
        } catch (error) {
            console.log(error);
        }

        setGenres([...movieGenres, ...tvGenres]);
    }, []);

    const viewInformation = (movie) => {
        setInformation(movie);
        setVisible(true);
    }

    const checkId = (genreId) => {
        const genre = genres.find(genre => genre.id === genreId);
        return genre ? genre.name : null;
    };
    const removeInfo = () => setVisible(false);
    return (
        <>
            <Head>
                <title>Cinematrix</title>
                <meta name="description" content="Entertainment web app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            <main className={`bg-dark-blue font-outfit lg:flex md:pt-6 lg:pt-0 lg:flex-wrap`}>
                <Navbar />
                <section className='lg:overflow-y-scroll overflow-x-hidden
         lg:h-screen lg:w-[93%] lg:ml-[8%] pb-4'>
                    <Trending viewInformation={viewInformation} url={trendingUrl} />
                    <UpcomingMovies viewInformation={viewInformation} />
                    <PopularMovies viewInformation={viewInformation} />
                    <TopRatedMovies viewInformation={viewInformation} />
                </section>
                <ViewInfo information={information} visible={visible} checkId={checkId} removeInfo={removeInfo} />
            </main >
        </>
    )
}
