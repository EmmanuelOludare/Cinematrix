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
            <main className='bg-dark-blue font-outfit lg:flex md:pt-6'>
                <Navbar />
                <section>
                    <p>hfddjdjd</p>
                </section>
            </main >
        </>
    )
}
