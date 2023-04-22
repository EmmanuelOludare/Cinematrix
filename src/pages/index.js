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
import bookmarkEmpty from '../assets/icon-bookmark-empty.svg';
import play from '../assets/play.svg';
import download from '../assets/download.svg';
import backArrow from '../assets/back.png'

export default function Home() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [genres, setGenres] = useState();
  const [information, setInformation] = useState();
  const [visible, setVisible] = useState(false);
  const trendingUrl = 'https://api.themoviedb.org/3/trending/all/day?api_key=48510b80e031b1cc54f349f5f5adb8bd';

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
      <main className={`bg-dark-blue font-outfit lg:flex md:pt-6 lg:pt-0 lg:flex-wrap`} >
        <Navbar />
        <section className='lg:overflow-y-scroll overflow-x-hidden
         lg:h-screen lg:w-[93%] lg:ml-[8%]'>
          <Trending viewInformation={viewInformation} url={trendingUrl} />
          <PopularMovies viewInformation={viewInformation} />
          <TopRatedMovies viewInformation={viewInformation} />
          <PopularSeries viewInformation={viewInformation} />
          <TopRatedSeries viewInformation={viewInformation} />
        </section>
        {visible ?
          <div className={`z-20 h-full w-screen fixed top-0 bottom-0 bg-black bg-opacity-90 px-4 ${visible ? `overflow-y-scroll` : `overflow-y-hidden`}`}>
            <div className='rounded-md bg-dark-blue z-30 text-white my-16 mx-auto max-w-[700px] relative'>
              <Image
                src={backArrow}
                alt=""
                className='h-7 w-6 lg:cursor-pointer absolute left-4 top-4'
                onClick={() => setVisible(false)}
              />
              <img
                src={`https://image.tmdb.org/t/p/original${information.backdrop_path}`}
                alt=""
                className='rounded-t-md w-full'
              />
              <div className='p-4 md:px-7 flex flex-col gap-2 font-light select-text-red'>
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
                <div className='flex justify-between mt-4'>
                  <div className='flex flex-col items-center lg:cursor-pointer'>
                    <Image
                      src={play}
                      alt="Cinematrix Logo"
                      className='h-6 w-6'
                    />
                    <p className='text-md  mt-[2px]'>Watch</p>
                  </div>
                  <div className='flex flex-col items-center lg:cursor-pointer'>
                    <Image
                      src={bookmarkEmpty}
                      alt="Cinematrix Logo"
                      className='h-6 w-4'
                    />
                    <p className='text-md mt-[2px]'>Bookmark</p>
                  </div>
                  <div className='flex flex-col items-center lg:cursor-pointer'>
                    <Image
                      src={download}
                      alt="Cinematrix Logo"
                      className='h-6 w-6'
                    />
                    <p className='text-md  mt-[2px]'>Download</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <></>}
      </main >
    </>
  )
}