import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useInfo } from '../../contexts/InfoContext';
import axios from 'axios'

export default function PopularMovies() {
    const { viewInformation, } = useInfo();
    const [popularMovies, setPopularMovies] = useState([]);
    const genreType = 'movie';
    const genreBranch = 'popular';
    useEffect(() => {
        const popularMoviesDetails = {
            method: 'GET',
            url: `https://cinematrixx.vercel.app/api/allGenreApi`,
            params: { genreType, genreBranch },
        }

        axios.request(popularMoviesDetails).then((response) => {
            setPopularMovies(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }, []);

    return (
        <div className="">
            <p className='pl-4 md:pl-7 pb-4 pt-6 text-white text-xl font-light md:text-4xl'>Popular Movies</p>
            <div className="w-screen lg:w-[90vw] flex justify-start gap-5">
                <Swiper
                    // install Swiper modules
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1000: { slidesPerView: 4 },
                    }}
                    direction="horizontal"
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                >
                    {popularMovies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div className='shrink-0 px-4 md:px-7 lg:cursor-pointer' onClick={() => viewInformation(movie)}>
                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt=""
                                    className='rounded-xl'
                                    width={300}
                                    height={400}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
