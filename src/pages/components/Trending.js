import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import mediaIcon from '../../assets/media-type.svg';
import bookmarkEmpty from '../../assets/icon-bookmark-empty.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export default function Trending({ viewInformation, trending, isLoading, }) {
  return (
    <div className="">
      <p className='pl-4 pb-4 pt-6 text-white text-xl font-light'>Trending Now</p>
      <div className="h-[200px] w-screen flex justify-start gap-5 overflow-x-scroll">
        {isLoading ? <Swiper
          // install Swiper modules
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          direction="horizontal"
          loop={true}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
          }}
        >
          {trending.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className='shrink-0 relative px-4 lg:cursor-pointer' onClick={() => viewInformation(movie)}>
                <div className='bg-dark-blue absolute right-8 top-3 opacity-50 rounded-[50%] p-[12px]'>
                  <Image
                    src={bookmarkEmpty}
                    alt=""
                    className='h-4 w-[14px]'
                  />
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt=""
                  className='rounded-xl'
                />
                <div className='text-white absolute left-8 bottom-5 flex flex-col gap-1'>
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
        </Swiper> : <p>up</p>}
      </div>
    </div>
  )
}