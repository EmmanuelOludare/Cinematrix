import { useState, useEffect } from 'react';
import Trending from './components/Trending';
import UpcomingMovies from './components/UpcomingMovies';
import PopularMovies from './components/PopularMovies';
import TopRatedMovies from './components/TopRatedMovies';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import search from '../assets/icon-search.svg';
import bookmarkEmpty from '../assets/icon-bookmark-empty.svg';
import play from '../assets/icon-bookmark-empty.svg';

export default function Bookmarked() {
    return (
        <>
            <main className='bg-dark-blue font-outfit pb-20 lg:flex md:pt-6'>
                <Navbar />
                <section>
                    <p>hfddjdjd</p>
                </section>
                <div className='bg-semi-dark-blue text-white fixed bottom-0 z-10 w-full py-3 px-5 flex items-center justify-between'>
                    <p className='text-lg'>Watch limitlessly!</p>
                    <div className='flex items-center gap-2'>
                        <Link href="/login" className='border-[1px] border-white rounded-xl py-2 px-5 font-bold'>Login</Link>
                        <Link href="/signup" className='text-red bg-white rounded-xl py-2 px-5 font-bold'>Sign up</Link>
                    </div>
                </div>
            </main >
        </>
    )
}
