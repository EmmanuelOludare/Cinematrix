import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import ScaleLoader from "react-spinners/ScaleLoader";

export default function UpcomingMovies({ viewInformation, }) {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        try {
            fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=48510b80e031b1cc54f349f5f5adb8bd&language=en-US&page=1')
                .then(res => res.json())
                .then(data => setUpcomingMovies(data.results));
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, []);

    return (
        <div className="">
            <p className='pl-4 md:pl-7 pb-4 pt-6 text-white text-xl font-light md:text-4xl'>Upcoming Movies</p>
            <div className="w-screen lg:w-[90vw] flex justify-start gap-5">
                {isLoading ? <div className='mx-auto'><ScaleLoader color="#FC4747" /></div> : <Swiper
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
                    {upcomingMovies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div className='shrink-0 px-4 md:px-7 lg:cursor-pointer' onClick={() => viewInformation(movie)}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt=""
                                    className='rounded-xl'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>}
            </div>
        </div>
    )
}
