import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import search from '../assets/icon-search.svg';
import mediaIcon from '../assets/media-type.svg';
import bookmarkEmpty from '../assets/icon-bookmark-empty.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export default function Home() {
  const [allMovies, setAllMovies] = useState([]);
  useEffect(() => {
    try {
      fetch('https://api.themoviedb.org/3/trending/all/day?api_key=48510b80e031b1cc54f349f5f5adb8bd')
        .then(res => res.json())
        .then(data => setAllMovies(data.results.splice(0, 10)));
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        <div className="">
          <p className='pl-4 pb-4 pt-6 text-white text-xl font-light'>Trending</p>
          <div className="h-[200px] w-screen flex justify-start gap-5 overflow-x-scroll">
            <Swiper
              // install Swiper modules
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              direction="horizontal"
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {allMovies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <div className='h-[200px] shrink-0 relative px-4'>
                    <div className='bg-dark-blue absolute right-6 top-2 opacity-50 rounded-[50%] p-[12px]'>
                      <Image
                        src={bookmarkEmpty}
                        alt=""
                        className='h-4 w-[14px]'
                      />
                    </div>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt=""
                      className='rounded-lg'
                    />
                    <div className='text-white absolute left-8 bottom-4 flex flex-col gap-1'>
                      <div className='flex gap-2 opacity-90 items-center'>
                        <p className='font-light text-sm w-[3.5ch] overflow-hidden whitespace-nowrap'>{movie.release_date || movie.first_air_date}</p>
                        <div className='h-[5px] w-[5px] rounded-[50%] bg-white'></div>
                        <div className='flex gap-[6px] items-center'>
                          <Image
                            src={mediaIcon}
                            alt=""
                            className='h-4 w-[14px]'
                          />
                          <p className='font-light text-sm'>{movie.media_type === 'tv' ? movie.media_type.charAt(0).toUpperCase() + movie.media_type.slice(1) + ` Series` : movie.media_type.charAt(0).toUpperCase() + movie.media_type.slice(1)}</p>
                        </div>
                        <div className='h-[5px] w-[5px] rounded-[50%] bg-white'></div>
                        <p className='font-light text-sm'>{movie.adult ? '18+' : 'PG'}</p>
                      </div>
                      <p className='text-md'>{movie.title || movie.name}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <Link href="/Signup" className='text-red'>Sign up</Link>
        <Link href="/Login" className='text-red'>Login</Link>
      </main >
    </>
  )
}
