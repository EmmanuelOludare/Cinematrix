import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/cinematrix.svg'
import home from '../../assets/icon-nav-home.svg'
import homeActive from '../../assets/icon-home-active.svg'
import movies from '../../assets/icon-nav-movies.svg'
import moviesActive from '../../assets/icon-movies-active.svg'
import series from '../../assets/icon-nav-tv-series.svg'
import seriesActive from '../../assets/icon-series-active.svg'
import bookmarks from '../../assets/icon-nav-bookmark.svg'
import bookmarksActive from '../../assets/icon-bookmark-active.svg'
import search from '../../assets/icon-search.svg';

export default function Navbar() {
    const router = useRouter();
    return (
        <nav className='bg-semi-dark-blue flex justify-between items-center px-4 py-5 max-h-screen lg:flex-col md:rounded-lg lg:rounded-none md:mx-6 lg:mx-0 lg:w-[7%] lg:fixed lg:h-full lg:py-10' >
            <Image
                src={logo}
                alt="Cinematrix Logo"
                className='lg:scale-[1.8]'
            />
            <div className='flex items-center gap-6 lg:flex-col lg:gap-20'>
                <Link href="/" className=''>
                    <Image
                        src={router.pathname === '/' ? homeActive : home}
                        alt=""
                        className='lg:scale-[1.8]'
                    />
                </Link>
                <Link href="/movies-page" className=''>
                    <Image
                        src={router.pathname === '/movies-page' ? moviesActive : movies}
                        alt=""
                        className='lg:scale-[1.8]'
                    />
                </Link>
                <Link href="/series-page" className=''>
                    <Image
                        src={router.pathname === '/series-page' ? seriesActive : series}
                        alt=""
                        className='lg:scale-[1.8]'
                    />
                </Link>
                <Link href="/bookmarked" className=''>
                    <Image
                        src={router.pathname === '/bookmarked' ? bookmarksActive : bookmarks}
                        alt=""
                        className='lg:scale-[1.8]'
                    />
                </Link>
            </div>
            <div>
                <Image
                    src={search}
                    alt="Cinematrix Logo"
                    className='lg:scale-[1.2] cursor-pointer'
                    onClick={() => router.push('/search-page')}
                />
            </div>
        </nav>
    )
}
