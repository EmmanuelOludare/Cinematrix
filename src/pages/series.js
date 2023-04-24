import Trending from './components/Trending';
import PopularSeries from './components/PopularSeries';
import TopRatedSeries from './components/TopRatedSeries';
import ViewInfo from './components/ViewInfo';
import Navbar from './components/Navbar';
import Head from 'next/head';
import { useInfo } from '../contexts/InfoContext';

export default function Series() {
    const { viewInformation, handleBookmark, bookmarks } = useInfo();
    const trendingUrl = 'https://api.themoviedb.org/3/trending/tv/day?api_key=48510b80e031b1cc54f349f5f5adb8bd';
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
                    <Trending url={trendingUrl} />
                    <PopularSeries />
                    <TopRatedSeries />
                </section>
                <ViewInfo />
            </main >
        </>
    )
}
