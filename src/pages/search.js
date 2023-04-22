import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import ViewInfo from './components/ViewInfo';
import search from '../assets/icon-search.svg';
import backArrow from '../assets/back.png'

export default function Search() {
    const router = useRouter();
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [genres, setGenres] = useState();
    const [information, setInformation] = useState();
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [searchInfo, setSearchInfo] = useState([]);

    const handleChange = e => {
        setQuery(e.target.value);
        getQuery();
    }

    async function getQuery() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=48510b80e031b1cc54f349f5f5adb8bd&language=en-US&query=${query}&page=1&include_adult=false`);
            const data = await response.json();
            setSearchInfo(data.results);
        } catch (error) {
            console.error(error);
        }
    }

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
            <main className='bg-dark-blue font-outfit min-h-screen '>
                <div className='flex items-center justify-between p-4 md:pl-7'>
                    <Image
                        src={backArrow}
                        alt=""
                        className='h-7 w-6 lg:cursor-pointer'
                        onClick={() => router.back()}
                    />
                </div>
                <div className='flex items-center px-4 gap-4 md:pl-7'>
                    <Image
                        src={search}
                        alt="Cinematrix Logo"
                        className='h-6 w-6'
                        onClick={getQuery}
                    />
                    <input type="text" value={query} onChange={handleChange} placeholder='Search for movies or TV series' className='outline-none bg-transparent w-full font-light indent-3 text-lg text-white focus:pb-1 caret-red focus:border-b-grayish-blue focus:border-b-2' />
                </div>
                <div className='grid grid-cols-2 gap-4 px-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 md:pl-7 mt-8 text-white'>
                    {searchInfo.map((movie, index) => (
                        <div key={index} className='shrink-0 lg:cursor-pointer' onClick={() => viewInformation(movie)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className='rounded-xl'
                            />
                        </div>
                    ))}
                </div>
                <ViewInfo information={information} visible={visible} checkId={checkId} removeInfo={removeInfo} />
            </main >
        </>
    )
}