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
import man from '../../assets/man.jpg'

export default function Navbar() {
    const router = useRouter();
    return (
        <nav className='bg-semi-dark-blue flex justify-between items-center px-4 py-5' >
            <Image
                src={logo}
                alt="Cinematrix Logo"
                className=''
                height={20}
                width={25}
            />
            <div className='flex items-center gap-6'>
                <Link href="/" className=''>
                    <Image
                        src={router.pathname === '/' ? homeActive : home}
                        alt=""
                        className=''
                        height={16}
                        width={20}
                    />
                </Link>
                <Link href="/movies" className=''>
                    <Image
                        src={router.pathname === '/movies' ? moviesActive : movies}
                        alt=""
                        className=''
                        height={16}
                        width={20}
                    />
                </Link>
                <Link href="/series" className='text-red'>
                    <Image
                        src={router.pathname === '/series' ? seriesActive : series}
                        alt=""
                        className=''
                        height={16}
                        width={20}
                    />
                </Link>
                <Link href="/bookmarked" className='text-red'>
                    <Image
                        src={router.pathname === '/bookmarked' ? bookmarksActive : bookmarks}
                        alt=""
                        className=''
                        height={16}
                        width={20}
                    />
                </Link>
            </div>
            <Image
                src={man}
                alt=""
                className='rounded-[50%] border-2 border-white'
                height={24}
                width={24}
            />
        </nav>
    )
}
