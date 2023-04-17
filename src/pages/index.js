import { useState, useEffect } from 'react';
import Trending from './components/Trending';
import PopularMovies from './components/PopularMovies';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import search from '../assets/icon-search.svg';

export default function Home() {
  const [trending, setTrending] = useState([])
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [genres, setGenres] = useState();
  const [information, setInformation] = useState();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch('https://api.themoviedb.org/3/trending/all/day?api_key=48510b80e031b1cc54f349f5f5adb8bd')
        .then(res => res.json())
        .then(data => setTrending(data.results.splice(0, 10)));
    } catch (error) {
      console.log(error);
    }

    try {
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=48510b80e031b1cc54f349f5f5adb8bd&language=en-US&page=1')
        .then(res => res.json())
        .then(data => setPopularMovies(data.results));
    } catch (error) {
      console.log(error);
    }

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

    setGenres([...movieGenres, ...tvGenres])
    setIsLoading(false);
  }, []);

  const viewInformation = (movie) => {
    setInformation(movie);
    setVisible(true);
  }

  const checkId = (genreId) => {
    for (let i = 0; i <= genres.length; i++) {
      if (genreId === genres[i].id) {
        return genres[i].name;
      }
    }
  }

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
            className='h-6 w-6'
          />
          <input type="text" placeholder='Search for movies or TV series' className='outline-none bg-transparent w-full font-light indent-3 text-lg text-white focus:pb-1 caret-red focus:border-b-grayish-blue focus:border-b-2' />
        </div>
        <Trending viewInformation={viewInformation} trending={trending} isLoading={isLoading} />
        <PopularMovies viewInformation={viewInformation} popularMovies={popularMovies} isLoading={isLoading} />
        {visible ?
          <div onClick={() => setVisible(false)} className='z-10 h-screen fixed top-0 bottom-0 bg-black bg-opacity-90 flex justify-center items-center p-4'>
            <div className='rounded-md bg-dark-blue z-20 text-white'>
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
                <div className='inline-block items-center gap-2'>
                  {information.genre_ids.map((genre, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      <div className='h-[5px] w-[5px] rounded-[50%] bg-white'></div>
                      <p className='text-lg '>{checkId(genre)}</p>
                    </div>
                  ))}
                </div>
                <p className='text-md '>{information.overview}</p>
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