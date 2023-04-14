import { usePopularMovies } from '../../contexts/PopularMoviesContext';
import Image from 'next/image';
import bookmarkEmpty from '../../assets/icon-bookmark-empty.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export default function PopularMovies({ viewInformation }) {
    const popularMovies = usePopularMovies();
    return (
        <div className="">
            <p className='pl-4 pb-4 pt-6 text-white text-xl font-light'>Popular Movies</p>
            <div className="h-[250px] w-screen flex justify-start gap-5 overflow-x-scroll">
                <Swiper
                    // install Swiper modules
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={2}
                    direction="horizontal"
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                >
                    {popularMovies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div className='shrink-0 px-4 lg:cursor-pointer' onClick={() => viewInformation(movie)}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt=""
                                    className='rounded-xl'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
