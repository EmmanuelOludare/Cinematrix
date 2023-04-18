import { useState, useEffect } from 'react';
import Trending from './components/Trending';
import PopularMovies from './components/PopularMovies';
import TopRatedMovies from './components/TopRatedMovies';
import PopularSeries from './components/PopularSeries';
import TopRatedSeries from './components/TopRatedSeries';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import search from '../assets/icon-search.svg';
import bookmarkEmpty from '../assets/icon-bookmark-empty.svg';
import play from '../assets/icon-bookmark-empty.svg';

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
    return (
        <>
            <Head>
                <title>Cinematrix</title>
                <meta name="description" content="Entertainment web app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="./favicon.ico" />
            </Head>
            <main className='bg-dark-blue font-outfit'>
                <Navbar />
                <div className='flex items-center px-4 gap-4 mt-6'>
                    <Image
                        src={search}
                        alt="Cinematrix Logo"
                        className=''
                        height={24}
                        width={24}
                    />
                    <input type="text" placeholder='Search for Movies' className='outline-none bg-transparent w-full font-light indent-3 text-lg text-white focus:pb-1 caret-red focus:border-b-grayish-blue focus:border-b-2' />
                </div>
                <Trending viewInformation={viewInformation} url={trendingUrl} />
                {visible ?
                    <div onClick={() => setVisible(false)} className='z-20 h-full fixed top-0 bottom-0 bg-black bg-opacity-90 flex justify-center items-center p-4'>
                        <div className='rounded-md bg-dark-blue z-30 text-white'>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${information.backdrop_path}`}
                                alt=""
                                className='rounded-t-md w-full'
                            />
                            <div className='p-4 flex flex-col gap-2 font-light select-text-red'>
                                <p className=' text-3xl'>{information.title || information.name}</p>
                                <div className='inline-flex gap-1 text-lg'>
                                    <p>Released: </p>
                                    <p className='w-[3.5ch] overflow-hidden whitespace-nowrap'>{information.release_date || information.first_air_date}</p>
                                </div>
                                <div className='flex flex-wrap items-center gap-2'>
                                    {information.genre_ids.map((genre, index) => (
                                        <div key={index} className='flex items-center gap-2'>
                                            <div className='h-[5px] w-[5px] rounded-[50%] bg-white'></div>
                                            <p className='text-lg'>{checkId(genre)}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className='text-md '>{information.overview}</p>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col items-center'>
                                        <Image
                                            src={bookmarkEmpty}
                                            alt="Cinematrix Logo"
                                            className='h-6 w-6'
                                        />
                                        <p>Bookmark</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <Image
                                            src={play}
                                            alt="Cinematrix Logo"
                                            className='h-6 w-6'
                                        />
                                        <p>Watch</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <Image
                                            src={bookmarkEmpty}
                                            alt="Cinematrix Logo"
                                            className='h-6 w-6'
                                        />
                                        <p>Download</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <></>}
                <Link href="/Signup" className='text-red'>Sign up</Link>
                <Link href="/Login" className='text-red'>Login</Link>
            </main >
        </>
    )
}
