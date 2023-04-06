import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/cinematrix.svg'
import home from '../../assets/icon-nav-home.svg'
import movies from '../../assets/icon-nav-movies.svg'
import series from '../../assets/icon-nav-tv-series.svg'
import bookmarks from '../../assets/icon-nav-bookmark.svg'
import man from '../../assets/man.jpg'

export default function Navbar() {
    return (
        <nav className='bg-semi-dark-blue flex justify-between items-center px-4 py-5'>
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
                        src={home}
                        alt=""
                        className=''
                        height={16}
                        width={20}
                    />
                </Link>
                <Link href="/Movies" className=''>
                    <Image
                        src={movies}
                        alt=""
                        className=''
                        height={16}
                        width={20}
                    />
                </Link>
                <Link href="/Series" className='text-red'>
                    <Image
                        src={series}
                        alt=""
                        className=''
                        height={16}
                        width={20}
                    />
                </Link>
                <Link href="/Bookmarked" className='text-red'>
                    <Image
                        src={bookmarks}
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
                className='rounded-full border-2 border-white'
                height={24}
                width={24}
            />
        </nav>
    )
}
