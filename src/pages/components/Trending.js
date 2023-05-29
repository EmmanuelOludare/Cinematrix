import { useState, useEffect } from 'react';
import Image from 'next/image';
import mediaIcon from '../../assets/media-type.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useInfo } from '../../contexts/InfoContext';
import axios from 'axios'

export default function Trending({ type }) {
  const { viewInformation, } = useInfo();
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trendingDetails = {
      method: 'GET',
      url: `https://cinematrixx.vercel.app/api/trendingApi`,
      params: { type },
    }

    axios.request(trendingDetails).then((response) => {
      setTrending(response.data)
    }).catch((error) => {
      console.error(error)
    })
    setIsLoading(false);
  }, []);

  return (
    <div className="">
      <div className="w-screen lg:w-[90vw] pt-8 lg:pt-4 flex justify-start gap-5 lg:mt-4">
        {isLoading ? <div className='mx-auto'><ScaleLoader color="#FC4747" /></div> : <Swiper
          // install Swiper modules
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          direction="horizontal"
          loop={true}
          autoplay={{
            delay: 60000,
            disableOnInteraction: false,
          }}
        >
          {trending.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className='shrink-0 relative px-4 md:px-7 lg:cursor-pointer' onClick={() => viewInformation(movie)}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt=""
                  className='rounded-3xl'
                  layout='fill'
                  object-fit='contain'
                />
                <div className='text-white absolute left-8 md:left-11 bottom-5 md:bottom-8 flex flex-col gap-1 mix-blend-difference'>
                  <div className='flex gap-2 opacity-90 items-center'>
                    <p className='font-light text-sm md:text-lg w-[3.5ch] overflow-hidden whitespace-nowrap'>{movie.release_date || movie.first_air_date}</p>
                    <div className='h-[5px] w-[5px] rounded-[50%] bg-white'></div>
                    <div className='flex gap-[6px] items-center'>
                      <Image
                        src={mediaIcon}
                        alt=""
                        className='h-4 w-[14px]'
                      />
                      <p className='font-light text-sm md:text-lg'>{movie.media_type === 'tv' ? movie.media_type.charAt(0).toUpperCase() + movie.media_type.slice(1) + ` Series` : movie.media_type.charAt(0).toUpperCase() + movie.media_type.slice(1)}</p>
                    </div>
                    <div className='h-[5px] w-[5px] rounded-[50%] bg-white'></div>
                    <p className='font-light text-sm md:text-lg'>{movie.adult ? '18+' : 'PG'}</p>
                  </div>
                  <p className='text-md md:text-3xl'>{movie.title || movie.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>}
      </div>
    </div>
  )
}