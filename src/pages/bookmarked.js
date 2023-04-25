import { useState, useEffect } from 'react';
import Trending from './components/Trending';
import UpcomingMovies from './components/UpcomingMovies';
import PopularMovies from './components/PopularMovies';
import TopRatedMovies from './components/TopRatedMovies';
import ViewInfo from './components/ViewInfo';
import Navbar from './components/Navbar';
import Head from 'next/head';
import { useInfo } from '../contexts/InfoContext';

export default function Bookmarked() {
    const { viewInformation, handleBookmark, bookmarks } = useInfo();
    return (
        <>
            <Head>
                <title>Cinematrix</title>
                <meta name="description" content="Entertainment web app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            <main className={`bg-dark-blue font-outfit lg:flex md:pt-6 lg:pt-0 lg:flex-wrap min-h-screen`}>
                <Navbar />
                <section className='lg:overflow-y-scroll overflow-x-hidden
         lg:h-screen lg:w-[93%] lg:ml-[8%] pb-4'>
                    <p className='pl-4 md:pl-7 pb-4 pt-4 lg:pt-4 text-white text-xl font-light md:text-4xl'>Bookmarked</p>
                    <div className='grid grid-cols-2 gap-4 px-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 md:pl-7 text-white'>
                        {bookmarks === [] ? <p className='text-white text-lg'>No Bookmarks Yet!</p> : bookmarks.map((movie, index) => (
                            <div key={index} className='shrink-0 lg:cursor-pointer' onClick={() => viewInformation(movie)}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    className='rounded-xl'
                                />
                            </div>
                        ))}
                    </div>
                </section>
                <ViewInfo />
            </main >
        </>
    )
}
