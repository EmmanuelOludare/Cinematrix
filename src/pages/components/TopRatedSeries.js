import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export default function TopRatedSeries({ viewInformation, }) {
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        try {
            fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=48510b80e031b1cc54f349f5f5adb8bd&language=en-US&page=1')
                .then(res => res.json())
                .then(data => setTopRatedSeries(data.results));
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, []);

    return (
        <div className="">
            <p className='pl-4 pb-4 pt-6 text-white text-xl font-light'>Top Rated Series</p>
            <div className=" w-screen flex justify-start gap-5 overflow-x-scroll">
                {isLoading ? <p>up</p> : <Swiper // install Swiper modules modules={[Autoplay]} spaceBetween={0}
                    slidesPerView={2} direction="horizontal" loop={true} autoplay={{
                        delay: 5000, disableOnInteraction: false,
                    }}>
                    {topRatedSeries.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div className='shrink-0 px-4 lg:cursor-pointer' onClick={() => viewInformation(movie)}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className='rounded-xl' />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>}
            </div>
        </div>
    )
}