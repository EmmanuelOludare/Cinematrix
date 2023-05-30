import { useState, } from 'react'
import Image from 'next/image';
import backArrow from '../../assets/back.png'
import { useInfo } from '../../contexts/InfoContext';

export default function ViewInfo({ movieGenreDetails, tvGenreDetails, }) {
    const { information, visible, removeInfo, } = useInfo();
    const [genres, setGenres] = useState(movieGenreDetails, tvGenreDetails);

    function checkId(genreId) {
        const genre = genres.find(item => item.id === genreId);
        return genre ? genre.name : 'Unknown Genre';
    }

    return (
        <div>
            {visible ?
                <div className={`z-20 h-full w-screen fixed top-0 bottom-0 bg-black bg-opacity-90 px-4 ${visible ? `overflow-y-auto` : `overflow-y-hidden`}`}>
                    <div className='rounded-md bg-dark-blue z-30 text-white my-16 mx-auto max-w-[700px] relative'>
                        <Image
                            src={backArrow}
                            alt=""
                            className='h-7 w-6 lg:cursor-pointer absolute left-4 top-4'
                            onClick={removeInfo}
                        />
                        <Image
                            src={information.backdrop_path}
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
                        </div>
                    </div>
                </div>
                : <></>
            }
        </div >
    )
}
