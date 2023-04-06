import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import search from '../assets/icon-search.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cinematrix</title>
        <meta name="description" content="Entertainment web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <main className='bg-dark-blue font-outfit'>
        <Navbar />
        <div className='flex items-center px-4 gap-4 mt-6'>
          <Image
            src={search}
            alt="Cinematrix Logo"
            className=''
            height={24}
            width={24}
          />
          <input type="text" placeholder='Search for movies or TV series' className='outline-none bg-transparent w-full font-light indent-3 text-lg text-white focus:pb-1 caret-red focus:border-b-grayish-blue focus:border-b-2' />
        </div>
        <Link href="/Signup" className='text-red'>Sign up</Link>
        <Link href="/Login" className='text-red'>Login</Link>
      </main >
    </>
  )
}
